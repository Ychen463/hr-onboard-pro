import { FacilityReport } from "src/app/pages/housing-page/interfaces/facility.report.interfaces";

export interface FacilityReportState {
  FacilityReports: FacilityReport[] | null;
  isLoading: boolean;
  error: string | null;
}