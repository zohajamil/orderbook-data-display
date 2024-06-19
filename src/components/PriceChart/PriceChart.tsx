import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface OrderWithTimestamp {
    price: number;
    size: number;
    timestamp: number;
}

interface PriceChartProps {
    bids: OrderWithTimestamp[];
    asks: OrderWithTimestamp[];
}

const aggregateData = (orders: OrderWithTimestamp[], interval: number) => {
    const aggregated: { [key: string]: { price: number; count: number } } = {};

    orders.forEach(order => {
        const timestamp = Math.floor(order.timestamp / interval) * interval;
        if (!aggregated[timestamp]) {
            aggregated[timestamp] = { price: order.price, count: 1 };
        } else {
            aggregated[timestamp].price += order.price;
            aggregated[timestamp].count += 1;
        }
    });

    return Object.entries(aggregated).map(([timestamp, { price, count }]) => ({
        timestamp: parseInt(timestamp),
        price: price / count,
    }));
};

const PriceChart: React.FC<PriceChartProps> = ({ bids, asks }) => {
    const thirtySeconds = 15 * 1000; // 15 seconds in milliseconds
    const now = Date.now();
    const filteredBids = bids.filter(bid => bid.timestamp >= now - thirtySeconds * 20); // Keep the last 10 minutes of data (20 * 30 seconds)
    const filteredAsks = asks.filter(ask => ask.timestamp >= now - thirtySeconds * 20); // Keep the last 10 minutes of data (20 * 30 seconds)

    const aggregatedBids = aggregateData(filteredBids, thirtySeconds).sort((a, b) => a.timestamp - b.timestamp);
    const aggregatedAsks = aggregateData(filteredAsks, thirtySeconds).sort((a, b) => a.timestamp - b.timestamp);

    const data = {
        labels: aggregatedBids.map(bid => new Date(bid.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Bids',
                data: aggregatedBids.map(bid => bid.price),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Asks',
                data: aggregatedAsks.map(ask => ask.price),
                borderColor: 'rgba(255,99,132,1)',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
};

export default PriceChart;
