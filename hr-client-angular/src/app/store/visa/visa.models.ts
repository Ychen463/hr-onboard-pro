import { Visa } from "src/app/pages/visa-page/interfaces/visa.model";
  
  export interface VisaState {
    visas: Visa[];
    selectedVisa: Visa | null;
    isLoading: boolean;
    error: string | null;
  }
