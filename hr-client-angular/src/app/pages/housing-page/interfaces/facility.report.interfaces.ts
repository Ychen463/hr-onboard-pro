export interface Commenter {
  _id: string;
  username: string;
  userRole: string;
}

interface Creator {
  _id: string;
  username: string;
  userRole: string;
}

export interface FacilityReportComments {
  description: string;
  createdBy: Commenter;
  lastModifiedDatetime: Date;
  _id: string;
}

export interface FacilityReport {
  _id: string;
  housing: string;
  title: string;
  description: string;
  createdBy: Creator;
  createdDatetime: Date;
  status: string;
  comments: FacilityReportComments[];
  __v: number;
}

export interface NewComment {
  facilityReportId: string;
  description: string;
}

export interface CommentToBeUpdated {
  facilityReportId: string;
  commentId: string;
  description: string;
}

export interface FacilityReportsResponse {
  message: string;
  reportList?: FacilityReport[];
}

export interface CommentResponse {
  message: string;
  updatedReport?: FacilityReport;
}
