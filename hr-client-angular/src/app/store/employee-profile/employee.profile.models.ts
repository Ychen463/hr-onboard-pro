import { ProfileSummary } from 'src/app/pages/employee-profiles-page/interfaces/employee.profile.interfaces';

export interface ProfileState {
  ProfileSummaries: ProfileSummary[] | null;
  isLoading: boolean;
  error: string | null;
}
