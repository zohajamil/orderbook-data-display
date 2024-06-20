import { OrderWithTimestamp } from "./OrderWithTimestamp";

export interface PriceChartProps {
    bids: OrderWithTimestamp[];
    asks: OrderWithTimestamp[];
}