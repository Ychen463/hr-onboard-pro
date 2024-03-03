import { createReducer, on, combineReducers } from "@ngrx/store";
import { HousingState } from "./housing.models";
import { housingSummaryActions, housingFullInfoActions, createHousingActions } from "./housing.actions";
import { produce } from 'immer';
import { HousingSummary } from "src/app/pages/housing-page/interfaces/housing.interfaces";

const initialState: HousingState = {
  isLoading: false,
  error: null,
  HousingSummaries: null,
  HousingFullInfo: null,
}

export const housingReducer = createReducer(
  initialState,

  on(housingSummaryActions.addsummaries, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(housingSummaryActions.addsummariessuccess, (state, { houseList }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.HousingSummaries = houseList;
    })
  ),

  on(housingSummaryActions.addsummariesfail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = error;
    })
  ),

  on(housingFullInfoActions.getfullinfo, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(housingFullInfoActions.getfullinfosuccess, (state, { house }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.HousingFullInfo = state.HousingFullInfo? // if HousingFullInfo exists
        (state.HousingFullInfo.find((housing) => housing._id == house._id)? // if the same house exists
          state.HousingFullInfo.map((housing) => {
            if(housing._id == house._id){
              return house;
            }else{
              return housing;
            }
          }):[...state.HousingFullInfo, house])
        : [ house ];
    })
  ),

  on(housingFullInfoActions.getfullinfofail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = error;
    })
  ),

  on(createHousingActions.createhousing, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(createHousingActions.createhousingsuccess, (state, { houseCreated }) =>
    produce(state, (draft) => {
      const newHouseSummary: HousingSummary = {
        _id: houseCreated._id,
        name: houseCreated.name,
        address: houseCreated.address,
        landlord: houseCreated.landlord,
        residents: 0,
      }

      draft.isLoading = false;
      if (state.HousingSummaries) {
        draft.HousingSummaries = [...state.HousingSummaries, newHouseSummary];
      } else {
        draft.HousingSummaries = [newHouseSummary];
      }
    })
  ),

  on(createHousingActions.createhousingfail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = error;
    })
  ),
)