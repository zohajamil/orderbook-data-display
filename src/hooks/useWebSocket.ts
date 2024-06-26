import { useEffect, useState } from 'react';
import { OrderWithTimestamp } from '../common/interfaces/OrderWithTimestamp';


interface Level2Update {
    changes: [string, string, string][]; // side(buy/sell) , price, size
}

interface Level2Snapshot {
    bids: [string, string][]; // price, size
    asks: [string, string][];
}

const useWebSocket = (pair: string) => {
    const [bids, setBids] = useState<OrderWithTimestamp[]>([]);
    const [asks, setAsks] = useState<OrderWithTimestamp[]>([]);

    useEffect(() => {
        const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

        const handleLevel2Snapshot = (data: Level2Snapshot) => {
            const timestamp = Date.now();
            setBids(data.bids.map(([price, size]) => ({ price: parseFloat(price), size: parseFloat(size), timestamp })));
            setAsks(data.asks.map(([price, size]) => ({ price: parseFloat(price), size: parseFloat(size), timestamp })));
        };

        const handleLevel2Update = (data: Level2Update) => {
            // console.log(data)
            const timestamp = Date.now();
            data.changes.forEach(([side, price, size]) => {
                const parsedPrice = parseFloat(price);
                const parsedSize = parseFloat(size);

                // if side is buy then its a bid.
                if (side === 'buy') {
                    setBids((prevBids) => {
                        const updatedBids = prevBids.filter(order => order.price !== parsedPrice);
                        if (parsedSize > 0) {
                            updatedBids.push({ price: parsedPrice, size: parsedSize, timestamp });
                        }
                        return updatedBids.sort((a, b) => b.price - a.price);
                    });
                } 
                // if side is sell, it is ask
                else {
                    setAsks((prevAsks) => {
                        const updatedAsks = prevAsks.filter(order => order.price !== parsedPrice);
                        if (parsedSize > 0) {
                            updatedAsks.push({ price: parsedPrice, size: parsedSize, timestamp });
                        }
                        return updatedAsks.sort((a, b) => a.price - b.price);
                    });
                }
            });
        };

        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "subscribe",
                channels: [
                    { name: "level2_batch", product_ids: [pair] }, // using level2_batch as it didn't require authentication
                ]
            }));
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // first response is snapshot
            if (message.type === "snapshot") {
                handleLevel2Snapshot(message);
            } 
            // after snapshot all responses are l2update
            else if (message.type === "l2update") {
                handleLevel2Update(message);
            }
        };

        return () => {
            ws.close();
        };
    }, [pair]);

    return { bids, asks };
};

export default useWebSocket;
