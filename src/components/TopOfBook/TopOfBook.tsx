import React from 'react';

interface Order {
    price: number;
    size: number;
}

interface TopOfBookProps {
    bids: Order[];
    asks: Order[];
}

const TopOfBook: React.FC<TopOfBookProps> = ({ bids, asks }) => {
    const bestBid = bids[0] || { price: 0, size: 0 };
    const bestAsk = asks[0] || { price: 0, size: 0 };

    return (
        <div>
            <h3>Top of Book</h3>
            <p>Best Bid: {bestBid.price} ({bestBid.size})</p>
            <p>Best Ask: {bestAsk.price} ({bestAsk.size})</p>
        </div>
    );
};

export default TopOfBook;
