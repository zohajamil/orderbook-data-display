import React, { useState } from 'react';
import useWebSocket from './hooks/useWebSocket';
import CurrencyDropdown from './components/CurrencyDropdown/CurrencyDropdown';
import LadderView from './components/LadderView/LadderView';
import PriceChart from './components/PriceChart/PriceChart';
import TopOfBook from './components/TopOfBook/TopOfBook';
import AppHeader from './components/AppHeader/AppHeader';
import ToggleSwitch from './components/ToggleSwitch/ToggleSwitch';
import { OrderWithTimestamp } from './common/interfaces/OrderWithTimestamp';
import { Loading } from 'react-loading-dot'
import { ThemeColors } from './common/enums/ThemeColors';
import { currencyPairs } from './common/CurrencyPairs';
import './App.scss';

const App: React.FC = () => {
    const [selectedPair, setSelectedPair] = useState<string>(currencyPairs[0]); // selected currency pair
    const [isLadder, setIsLadder] = useState(false); // Is ladder view boolean for toggling

    const { bids, asks } = useWebSocket(selectedPair);

    return (
        <div className="App">
            <AppHeader />
            <CurrencyDropdown selectedPair={selectedPair} onPairChange={setSelectedPair} />
            {bids.length === 0 && asks.length === 0 ? (
                <Loading background={ThemeColors.DARK_PRIMARY_COLOR} />
            ) : (
                <div className="widgets">
                    <TopOfBook bids={bids} asks={asks} />
                    <ToggleSwitch checked={isLadder} setChecked={setIsLadder} />
                    {isLadder ? (
                        <LadderView bids={bids as OrderWithTimestamp[]} asks={asks as OrderWithTimestamp[]} />
                    ) : (
                        <PriceChart bids={bids} asks={asks} />
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
