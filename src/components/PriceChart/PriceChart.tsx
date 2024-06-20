import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { ThemeColors } from '../../common/enums/ThemeColors';
import { OrderWithTimestamp } from '../../common/interfaces/OrderWithTimestamp';
import { PriceChartProps } from '../../common/interfaces/PriceChartProps';
import './priceChart.scss';
// Need to register all components used from chartjs
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


const aggregateData = (orders: OrderWithTimestamp[], interval: number) => {
    // dictionary [timestamp] : {price, count} - will help in calculating average of bids and asks at a time
    const aggregated: { [key: string]: { price: number; count: number } } = {};

    orders.forEach(order => {
        // timestamp according to 15 seconds interval
        const timestamp = Math.floor(order.timestamp / interval) * interval;
        if (!aggregated[timestamp]) {
            aggregated[timestamp] = { price: order.price, count: 1 };
        } else {
            aggregated[timestamp].price += order.price;
            aggregated[timestamp].count += 1;
        }
    });

    // calculating avg to show on chart
    return Object.entries(aggregated).map(([timestamp, { price, count }]) => ({
        timestamp: parseInt(timestamp),
        price: price / count,
    }));
};

const PriceChart: React.FC<PriceChartProps> = (props: PriceChartProps) => {
    const now = Date.now();
    const interval = 15 * 1000; // 15 secs in milliseconds - show data with scale of 15 secs
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds - keep data of last 1 hour only

    const data = useMemo(() => {
        const filteredBids = props.bids.filter(bid => bid.timestamp >= now - oneHour); // filter bids data of last 1 hour only
        const filteredAsks = props.asks.filter(ask => ask.timestamp >= now - oneHour); // filter asks data of last 1 hour only

        // Sorting as without this data on chart was not in proper order
        const aggregatedBids = aggregateData(filteredBids, interval).sort((a, b) => a.timestamp - b.timestamp); 
        const aggregatedAsks = aggregateData(filteredAsks, interval).sort((a, b) => a.timestamp - b.timestamp);

        return {
            labels: aggregatedBids.map(bid => new Date(bid.timestamp).toLocaleTimeString()), // x-axis labels
            datasets: [
                {
                    label: 'Bids',
                    data: aggregatedBids.map(bid => bid.price),
                    borderColor: ThemeColors.BIDS_COLOR, 
                    fill: false,
                },
                {
                    label: 'Asks',
                    data: aggregatedAsks.map(ask => ask.price),
                    borderColor: ThemeColors.ASKS_COLOR,
                    fill: false,
                },
            ],
        };
    }, [props.bids, props.asks])

    return (
        <div className='chart-canvas-wrapper'>
            <Line data={data} height={100} />
        </div>
    );
};

export default PriceChart;
