import axios from "axios";
import { environment } from "../configuration/development";
import type { Order } from "../models/order.model";

interface OrdersResponse {
  inProgress: Order[];
  completed: Order[];
}

export class OrderService {
    private static instance: OrderService;
    private getUrl = `${environment.apiUrl}/${environment.orderService}/all`;
    private getById = `${environment.apiUrl}/${environment.orderService}`;
    private createApi = `${environment.apiUrl}/${environment.orderService}/create`;
    
    private constructor() {}
    
    public static getInstance(): OrderService {
        if (!OrderService.instance) {
        OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }
    
    public async getOrders(): Promise<OrdersResponse> {
        try {
        const response = await axios.get<OrdersResponse>(this.getUrl);
        return response.data;
        } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
        }
    }

    public async getOrderById(orderId: string): Promise<Order> {
        try {
        const response = await axios.get<Order>(`${this.getById}/${orderId}`);
        return response.data;
        } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
        }
    }
    
    public async addOrder(orderData: any): Promise<any> {
        try {
        const response = await axios.post(this.createApi, orderData);
        return response.data;
        } catch (error) {
        console.error("Error adding order:", error);
        throw error;
        }
    }
}