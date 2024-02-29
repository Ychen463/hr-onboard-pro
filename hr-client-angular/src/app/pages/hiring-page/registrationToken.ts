  export interface RegistrationTokenData {
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
  export interface DisplayedData {
    email: string;
    name: string;
    registrationLink: string;
    status: string;

  }