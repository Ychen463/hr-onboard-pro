import { HousingSummary, HousingProfile } from "src/app/pages/housing-page/interfaces/housing.interfaces";

export interface HousingState {
  isLoading: boolean;
  error: string | null;
  HousingSummaries: HousingSummary[] | null;
  HousingFullInfo: HousingProfile[] | null;
}