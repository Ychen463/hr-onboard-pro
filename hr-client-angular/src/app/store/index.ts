import { combineReducers } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { employeeProfileReducer } from './employee-profile/employee.profile.reducer';
// import { visaReducer } from './visa/visa.reducer';
// import { hiringReducer } from './hiring/hiring.reducer';
// import { housingReducer } from './housing/housing.reducer';
// import { facilityReportReducer } from './facility-report/facility-report.reducer';
// import other reducers

export const rootReducer = combineReducers({
  auth: authReducer,
  employeeProfile: employeeProfileReducer,
  // visa: visaReducer,
  // hiring: hiringReducer,
  // housing: housingReducer,
  // facilityReport: facilityReportReducer,
  // other reducers
});
