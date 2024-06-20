export interface OrderWithTimestamp {
    price: number;
    size: number;
    timestamp: number;
    type?: 'bid' | 'ask';
}
