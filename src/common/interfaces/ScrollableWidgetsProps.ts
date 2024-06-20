import { Order } from "./Order";

export interface ScrollableWidgetProps {
    aggregatedBids: Order[]
    aggregatedAsks: Order[]
}