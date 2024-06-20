import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import './currencyDropdown.scss';
import { CurrencyDropdownProps } from '../../common/interfaces/CurrencyDropdownProps';
import { currencyPairs } from '../../common/CurrencyPairs';

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = (props: CurrencyDropdownProps) => {
    return (
        <div className='currency-dropdown-wrapper'>
            <FormControl className='right-aligned'>
                <InputLabel id="currency-pair-select-label">Currency Pair</InputLabel>
                <Select
                    labelId="currency-pair-select-label"
                    id="currency-pair-select"
                    value={props.selectedPair}
                    label="Currency Pair"
                    onChange={(e) => props.onPairChange(e.target.value)}
                >
                    {currencyPairs.map((pair) => (
                        <MenuItem key={pair} value={pair}>
                            {pair}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default CurrencyDropdown;