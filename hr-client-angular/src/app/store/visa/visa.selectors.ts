import { createSelector } from '@ngrx/store';
import { VisaState } from './visa.models';
import { Visa } from '../../pages/visa-page/interfaces/visa.model'

export const selectVisaState = (state: VisaState) => state;

export const selectAllVisas = createSelector(
  selectVisaState,
  (state) => state.visas
);

export const selectVisaByUserAccountId = createSelector(
  (state: { visa: VisaState }) => state.visa.visas, // Accessing `visas` array from the `VisaState`
  (visas: Visa[], props: { userAccountId: string }) => visas.find(visa => visa.userAccountId === props.userAccountId)
);

