import axios from "axios";
import { environment } from "../configuration/development";

export class ShopService {
  private static instance: ShopService;
  private apiUrl = `${environment.apiUrl}/${environment.shopService}/all`;
  private createApi = `${environment.apiUrl}/${environment.shopService}/create`;  
  private constructor() {}

  public static getInstance(): ShopService {
    if (!ShopService.instance) {
      ShopService.instance = new ShopService();
    }
    return ShopService.instance;
  }

  public async getShops(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching shops:", error);
      throw error;
    }
  }

  public async addShop(shopData: any): Promise<any> {
    try {
      const response = await axios.post(this.createApi, shopData);
      return response.data;
    } catch (error) {
      console.error("Error adding shop:", error);
      throw error;
    }
  }
}