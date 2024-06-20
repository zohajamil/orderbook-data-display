import React, { useMemo } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { BestPriceWidgetProps } from '../../common/interfaces/BestPriceWidgetProps';
import { ThemeColors } from '../../common/enums/ThemeColors';


const BestPriceWidget: React.FC<BestPriceWidgetProps> = (props: BestPriceWidgetProps) => {
    const isBid: boolean = useMemo(() => { return props.type === 'Bid' }, [props.type])

    return (
        <Paper elevation={3} style={{ width: 400, borderRadius: 8, overflow: 'hidden' }}>
            <Box
                sx={{
                    backgroundColor: isBid ? ThemeColors.BIDS_COLOR : ThemeColors.ASKS_COLOR,
                    color: 'white',
                    padding: '10px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}
            >
                Best {props.type}
            </Box>

            <Box sx={{ padding: '10px' }}>
                <Grid container spacing={2} borderColor={'black'}>
                    <Grid item xs={6}>
                        <Typography variant="body1"><b>{props.price}</b></Typography>
                        <Typography variant="body1">{props.type} Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1"><b>{props.quantity}</b></Typography>
                        <Typography variant="body1">{props.type} Quantity</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default BestPriceWidget;
