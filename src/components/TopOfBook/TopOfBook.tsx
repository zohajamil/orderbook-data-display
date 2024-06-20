import React from 'react';
import BestPriceWidget from '../BestPriceWidget/BestPriceWidget';
import { Box, Grid } from '@mui/material';
import { TopOfBookProps } from '../../common/interfaces/TopOfBookProps';

// Best Bid and ask boxes
const TopOfBook: React.FC<TopOfBookProps> = (props: TopOfBookProps) => {
    const bestBid = props.bids[0] || { price: 0, size: 0 };
    const bestAsk = props.asks[0] || { price: 0, size: 0 };

    return (
        <div>
            <Box sx={{ flexGrow: 1, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <BestPriceWidget type={'Bid'} price={bestBid.price} quantity={bestBid.size} />
                    </Grid>
                    <Grid item>
                        <BestPriceWidget type={'Ask'} price={bestAsk.price} quantity={bestAsk.size} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default TopOfBook;
