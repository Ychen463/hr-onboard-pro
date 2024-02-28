export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  userId: string;
  username: string;
  userRole: string;
  email: string;
  // Add other relevant user properties
}
