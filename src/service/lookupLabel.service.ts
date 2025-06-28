import { LookupService } from './lookup.service';

export class LookupLabelService {
  private static instance: LookupLabelService;
  private lutData: any = null;
  private readonly lookupService: LookupService;
  constructor(lookupService?: LookupService) {
    this.lookupService = lookupService ?? LookupService.getInstance();
  }

  public static getInstance(): LookupLabelService {
    if (!LookupLabelService.instance) {
      LookupLabelService.instance = new LookupLabelService();
    }
    return LookupLabelService.instance;
  }

  public async getLookupLabel(): Promise<any> {
    if (this.lutData) {
      return this.lutData;
    }

    const cached = sessionStorage.getItem('lookupData');
    if (cached) {
      this.lutData = JSON.parse(cached);
      return this.lutData;
    }
    try {
      this.lutData = await this.lookupService.getAllLookups();
      return this.lutData;
    } catch (error) {
      console.error('Error getting lookup label:', error);
      throw error;
    }
  }

  getCategories(): any[] {
    return this.lutData?.categories ?? [];
  }

  getStates(): any[] {
    return this.lutData?.states ?? [];
  }

  getRoles(): any[] {
    return this.lutData?.roles ?? [];
  }

  getStatus(): any[] {
    return this.lutData?.status ?? [];
  }
}
