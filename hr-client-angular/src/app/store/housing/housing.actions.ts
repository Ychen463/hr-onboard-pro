import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HousingSummary, HousingProfile } from 'src/app/pages/housing-page/interfaces/housing.interfaces';

export const housingSummaryActions = createActionGroup({
  source: 'Housing',
  events: {
    addSummaries: emptyProps(),
    addSummariesSuccess: props<{ houseList: Array<HousingSummary> }>(),
    addSummariesFail: props<{ error: string }>(),
  },
});

export const housingFullInfoActions = createActionGroup({
  source: 'Housing',
  events: {
    getFullInfo: emptyProps(),
    getFullInfoSuccess:props<{ house: HousingProfile }>(),
    getFullInfoFail: props<{ error: string }>(),
  },
});

export const createHousingActions = createActionGroup({
  source: 'Housing',
  events: {
    createHousing: emptyProps(),
    createHousingSuccess:props<{ houseCreated: HousingProfile }>(),
    createHousingFail: props<{ error: string }>(),
  },
});