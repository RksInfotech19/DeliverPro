export interface Order {
    orderId: number;
    productType: number;
    productName: string;
    weight: number;
    address: string;
    customerName: string;
    customerPhone: string;
    specialInstructions: string;
    deliveryDate: string;
    shopID: number;
    status: number;
    createdBy: string | null;
    createdDate: string;
    updatedDate: string | null;
    updatedBy: string | null;
}