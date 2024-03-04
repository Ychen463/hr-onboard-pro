interface Landlord {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface Resident {
  email: string;
  userFirstName: string;
  userLastName: string;
  userAccountId: string;
}

interface FacilityInfo {
  beds: number;
  mattresses: number;
  tables: number;
  chairs: number;
}

export interface HousingSummary {
  _id: string;
  name: string;
  address: string;
  landlord: Landlord;
  residents: number;
}

export interface HousingProfile {
  _id: string;
  name: string;
  address: string;
  landlord: Landlord;
  residents: Resident[];
  facilityInfo: FacilityInfo;
  __v: number;
}

export interface NewHousing {
  name: string;
  address: string;
  landlord: Landlord;
  facilityInfo: FacilityInfo;
}

export interface HousingSummaryResponse {
  message: string;
  houseList?: HousingSummary[];
}

export interface HousingProfileResponse {
  message: string;
  house?: HousingProfile;
}

export interface CreateHousingResponse {
  message: string;
  houseCreated?: HousingProfile;
}
