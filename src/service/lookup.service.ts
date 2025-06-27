import axios from 'axios';

const API_URL = 'http://localhost:3000/api/lookup/all';

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
      return response.data;
    } catch (error) {
      console.error('Error fetching lookups:', error);
      throw error;
    }
  }
}
