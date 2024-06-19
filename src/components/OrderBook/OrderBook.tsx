import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';

type Order = [string, string]; // [price, size]
type Orders = Order[];

interface OrderWithTimestamp {
    price: string;
    size: string;
    timestamp: Date;
}

const aggregateOrders = (orders: Orders, increment: number): Orders => {
    const aggregated: { [key: string]: number } = {};

    orders.forEach(([price, size]) => {
        const aggregatedPrice = (Math.floor(parseFloat(price) / increment) * increment).toFixed(2);
        if (!aggregated[aggregatedPrice]) {
            aggregated[aggregatedPrice] = 0;
        }
        aggregated[aggregatedPrice] += parseFloat(size);
    });

    return Object.entries(aggregated).map(([price, size]) => [price, size.toFixed(8)]);
};

const OrderBook: React.FC = () => {
    const [bids, setBids] = useState<OrderWithTimestamp[]>([]);
    const [asks, setAsks] = useState<OrderWithTimestamp[]>([]);
    const [increment, setIncrement] = useState<number>(0.01);


    useEffect(() => {
        const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
        ws.onopen = () => {
            const subscribeMessage = {
                type: 'subscribe',
                channels: [{ name: 'level2_batch', product_ids: ['BTC-USD'] }]
            };
            ws.send(JSON.stringify(subscribeMessage));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data)
            // if (data.type === 'snapshot') {
            //     const currentTime = new Date();
            //     setBids(data.bids.map(([price, size]: [string, string]) => ({ price, size, timestamp: currentTime })));
            //     setAsks(data.asks.map(([price, size]: [string, string]) => ({ price, size, timestamp: currentTime })));
            // } else 
            if (data.type === 'l2update') {
                const currentTime = new Date();
                data.changes.forEach(([side, price, size]: [string, string, string]) => {
                    if (side === 'buy') {
                        setBids((prevBids) => {
                            const updatedBids = [...prevBids];
                            const index = updatedBids.findIndex((bid) => bid.price === price);
                            if (index !== -1) {
                                if (size === '0.00000000') {
                                    updatedBids.splice(index, 1);
                                } else {
                                    updatedBids[index].size = size;
                                    updatedBids[index].timestamp = currentTime;
                                }
                            } else {
                                updatedBids.push({ price, size, timestamp: currentTime });
                            }
                            return updatedBids;
                        });
                    } else {
                        setAsks((prevAsks) => {
                            const updatedAsks = [...prevAsks];
                            const index = updatedAsks.findIndex((ask) => ask.price === price);
                            if (index !== -1) {
                                if (size === '0.00000000') {
                                    updatedAsks.splice(index, 1);
                                } else {
                                    updatedAsks[index].size = size;
                                    updatedAsks[index].timestamp = currentTime;
                                }
                            } else {
                                updatedAsks.push({ price, size, timestamp: currentTime });
                            }
                            return updatedAsks;
                        });
                    }
                });
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    const aggregatedBids = useMemo(() => aggregateOrders(bids.map(bid => [bid.price, bid.size]), increment), [bids, increment]);
    const aggregatedAsks = useMemo(() => aggregateOrders(asks.map(ask => [ask.price, ask.size]), increment), [asks, increment]);

    const handleIncrementChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setIncrement(parseFloat(e.target.value));
    }, []);

    const chartData = useMemo(() => {
        console.log('bids and asks set')
        const formatData = (orders: OrderWithTimestamp[]) => orders.map(order => ({
            x: order.timestamp,
            y: parseFloat(order.price)
        }));

        return {
            series: [
                {
                    name: 'Bids',
                    data: formatData(bids)
                },
                {
                    name: 'Asks',
                    data: formatData(asks)
                }
            ]
        };
    }, [bids, asks]);

    const chartOptions: ApexOptions = {
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            }
        },
        yaxis: {
            title: {
                text: 'Price'
            }
        },
        title: {
            text: 'Order Book Bids and Asks',
            align: 'left'
        },
        legend: {
            position: 'top'
        }
    };

    return (
        <div>
            <h2>Order Book</h2>
            <label>
                Price Increment:
                <select value={increment} onChange={handleIncrementChange}>
                    <option value={0.01}>$0.01</option>
                    <option value={0.05}>$0.05</option>
                    <option value={0.10}>$0.10</option>
                    <option value={0.50}>$0.50</option>
                    <option value={1.00}>$1.00</option>
                </select>
            </label>
            <h3>Bids and Asks Chart</h3>
            <ReactApexChart options={chartOptions} series={chartData.series} type="line" height={350} />
        </div>
    );
};

export default OrderBook;
