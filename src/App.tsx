// src/App.tsx
import React, { useState } from 'react';
import useWebSocket from './hooks/useWebSocket';
import './App.scss';
import CurrencyDropdown from './components/CurrencyDropdown/CurrencyDropdown';
import LadderView from './components/LadderView/LadderView';
import PriceChart from './components/PriceChart/PriceChart';
import TopOfBook from './components/TopOfBook/TopOfBook';
import AppHeader from './components/AppHeader/AppHeader';

const App: React.FC = () => {
    const [selectedPair, setSelectedPair] = useState<string>('BTC-USD');
    const { bids, asks } = useWebSocket(selectedPair);

    return (
        <div className="App">
            <AppHeader />
            <CurrencyDropdown selectedPair={selectedPair} onPairChange={setSelectedPair} />
            <div className="widgets">
                <TopOfBook bids={bids} asks={asks} />
                <PriceChart bids={bids} asks={asks} />
                <LadderView bids={bids} asks={asks} increment={0.01} />
            </div>
        </div>
    );
};

export default App;
