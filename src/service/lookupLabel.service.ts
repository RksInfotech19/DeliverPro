import { LookupService } from './lookup.service';

export class LookupLabelService {
  private lutData: any;

  private readonly lookupService: LookupService;

  constructor(lookupService?: LookupService) {
    this.lookupService = lookupService ?? LookupService.getInstance();
  }

  public async getLookupLabel(): Promise<any> {
    try {
      this.lutData = await this.lookupService.getAllLookups();
      sessionStorage.setItem('lookupData', JSON.stringify(this.lutData));
      console.log('Lookup data retrieved and stored in sessionStorage:', this.lutData);    
    } catch (error) {
      console.error('Error getting lookup label:', error);
      throw error;
    }
  }

    getStates(): any[] {
        return this.lutData?.states ?? [];
    }

    getCategories(): any[] {
        return this.lutData?.categories ?? [];
    }

    getRoles(): any[] {
        return this.lutData?.roles ?? [];
    }

    getStatus(): any[] {
        return this.lutData?.status ?? [];
    }
}
