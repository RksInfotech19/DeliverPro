export interface Order {
    orderID: number;
    shopID: number;
    productType: number;
    productName: string;
    weight: number;
    address: string;
    customerName: string;
    customerPhone: string;
    specialInstructions: string;
    deliveryDate: string;
}