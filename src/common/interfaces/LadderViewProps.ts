import { OrderWithTimestamp } from "./OrderWithTimestamp";

export interface LadderViewProps {
    bids: OrderWithTimestamp[];
    asks: OrderWithTimestamp[];
}