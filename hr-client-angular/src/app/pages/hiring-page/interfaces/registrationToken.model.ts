export interface RegistrationToken {
  _id: string;
  email: string;
  userFirstName: string;
  userLastName: string;
  registrationLink: string;
  token: string;
  tokenStatus: string;
  createdDatetime: Date;
  usedDatetime: Date | null;
  __v: number;
}
export interface DisplayedRegistrationToken {
  email: string;
  name: string;
  registrationLink: string;
  tokenStatus: string;
  createdDatetime: Date;
}
export interface GenerateRegistrationTokenInput {
  userFirstName: string;
  userLastName: string;
  email: string;
}
