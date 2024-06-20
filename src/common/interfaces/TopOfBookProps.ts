import { Order } from "./Order";

export interface TopOfBookProps {
    bids: Order[];
    asks: Order[];
}