import React, { useState } from 'react';

interface Order {
    price: number;
    size: number;
}

interface LadderViewProps {
    bids: Order[];
    asks: Order[];
    increment: number;
}

const aggregateOrders = (orders: Order[], increment: number) => {
    const aggregated: { [key: string]: number } = {};

    orders.forEach(({ price, size }) => {
        const roundedPrice = (Math.floor(price / increment) * increment).toFixed(2);
        if (!aggregated[roundedPrice]) {
            aggregated[roundedPrice] = 0;
        }
        aggregated[roundedPrice] += size;
    });

    return Object.entries(aggregated).map(([price, size]) => ({ price: parseFloat(price), size }));
};

const LadderView: React.FC<LadderViewProps> = ({ bids, asks, increment }) => {
    const [aggregationIncrement, setAggregationIncrement] = useState(increment);

    const aggregatedBids = aggregateOrders(bids, aggregationIncrement);
    const aggregatedAsks = aggregateOrders(asks, aggregationIncrement);

    return (
        <div>
            <h3>Ladder View</h3>
            <label>
                Aggregation Increment:
                <select
                    value={aggregationIncrement}
                    onChange={(e) => setAggregationIncrement(parseFloat(e.target.value))}
                >
                    <option value={0.01}>0.01</option>
                    <option value={0.05}>0.05</option>
                    <option value={0.10}>0.10</option>
                    <option value={0.50}>0.50</option>
                    <option value={1.00}>1.00</option>
                </select>
            </label>
            {/* <div>
                <h4>Bids</h4>
                <ul>
                    {aggregatedBids.map(({ price, size }) => (
                        <li key={price}>
                            {price}: {size}
                        </li>
                    ))}
                </ul>
            </div> */}
            {/* <div>
                <h4>Asks</h4>
                <ul>
                    {aggregatedAsks.map(({ price, size }) => (
                        <li key={price}>
                            {price}: {size}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default LadderView;
