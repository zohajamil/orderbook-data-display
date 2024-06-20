import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { ScrollableWidgetProps } from '../../common/interfaces/ScrollableWidgetsProps';
import { ThemeColors } from '../../common/enums/ThemeColors';

// Used to display the ladder view of the bids and asks
const ScrollableWidgets: React.FC<ScrollableWidgetProps> = (props: ScrollableWidgetProps) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{ color: ThemeColors.BIDS_COLOR }}>
                    <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>Bids (Price:Quantity)</Typography>
                </Grid>
                <Grid item xs={6} sx={{ color: ThemeColors.ASKS_COLOR }}>
                    <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>Asks (Price:Quantity)</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ height: '500px', overflowY: 'auto', padding: 2, backgroundColor: 'black', color: 'white' }}>
                        {props.aggregatedBids.map((bid, index) => (
                            <Typography key={index} sx={{ marginBottom: 1 }}>{`${bid.price} : ${bid.size}`}</Typography>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ height: '500px', overflowY: 'auto', padding: 2, backgroundColor: 'black', color: 'white' }}>
                        {props.aggregatedAsks.map((ask, index) => (
                            <Typography key={index} sx={{ marginBottom: 1 }}>{`${ask.price} : ${ask.size}`}</Typography>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ScrollableWidgets;
