import axios from 'axios';
import { developmentConfig } from '../configuration/development';

const API_URL = `${developmentConfig.apiUrl}/${developmentConfig.lookupService}/all`;

export class LookupService {
  private static instance: LookupService;

  private constructor() {}

  public static getInstance(): LookupService {
    if (!LookupService.instance) {
      LookupService.instance = new LookupService();
    }
    return LookupService.instance;
  }

  public async getAllLookups(): Promise<any> {
    try {
      const response = await axios.get(API_URL);
      sessionStorage.setItem('lookupData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching lookups:', error);
      throw error;
    }
  }
}
