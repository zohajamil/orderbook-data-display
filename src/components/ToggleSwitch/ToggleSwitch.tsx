import React from 'react';
import { Switch, FormControlLabel, Grid, FormControl } from '@mui/material';
import './toggleSwitch.scss'

export interface ToggleSwitchProps {
    checked: boolean;
    setChecked: (checked: boolean) => void
}

// To give option to user to toggle between ladder or chart view
const ToggleSwitch: React.FC<ToggleSwitchProps> = (props: ToggleSwitchProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setChecked(event.target.checked);
    };

    return (
        <FormControl>
            <Grid container alignItems="center" spacing={1} sx={{ color: 'black' }}>
                <Grid item xs>
                    <Grid container justifyContent="flex-end">
                        Chart View
                    </Grid>
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={<Switch checked={props.checked} onChange={handleChange} />}
                        label=""
                        sx={{ mx: 1 }}
                    />
                </Grid>
                <Grid item xs>
                    <Grid container justifyContent="flex-start">
                        Ladder View
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default ToggleSwitch;
