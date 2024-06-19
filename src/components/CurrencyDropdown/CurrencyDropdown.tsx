import React from 'react';

interface CurrencyDropdownProps {
    selectedPair: string;
    onPairChange: (pair: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ selectedPair, onPairChange }) => {
    const pairs = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];

    return (
        <select value={selectedPair} onChange={(e) => onPairChange(e.target.value)}>
            {pairs.map((pair) => (
                <option key={pair} value={pair}>
                    {pair}
                </option>
            ))}
        </select>
    );
};

export default CurrencyDropdown;