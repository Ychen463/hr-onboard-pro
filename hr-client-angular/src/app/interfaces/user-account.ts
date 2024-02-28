export interface UserAccount {
  email: string;
  username: string;
  userRole: UserRole;
  onboardingStatus?: string;
  visaStatus?: string;
  housingId: string;
  registrationTokenId: string;
}

export type UserRole = 'employee' | 'HR';
