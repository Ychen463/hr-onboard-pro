export interface LoginResponse {
  message: string;
  loginJwtToken: string;
  user: {
    userId: string;
    username: string;
    userRole: string;
    email: string;
    housingId: string;
    onboardingStatus: string;
    visaStatus: string;
  };
}
