import { createReducer, on } from '@ngrx/store';
import * as VisaActions from './visa.actions';
import { VisaState } from './visa.models';
import { VisaDocument } from '../../pages/visa-page/interfaces/visa.model'

export const initialState: VisaState = {
    visas: [],
    selectedVisa: null,
    error: null,
    isLoading: false,
  };


export const visaReducer = createReducer(
  initialState,
  // GET VISA
  on(VisaActions.getVisasSuccess, (state, { visas }) => ({
    ...state,
    visas: visas,
    error: null,
  })),
  on(VisaActions.getVisasFail, (state, { error }) => ({
    ...state,
    error: error,
  })),
  // SELECT BY USERACCOUNTID
  on(VisaActions.selectVisaByUserAccountId, (state, { visa }) => ({
    ...state,
    selectedVisa: visa,
  })),
    // UPDATE HR DECISION

    on(VisaActions.updateHRDecision, (state, { userAccountId, documentType, hrDecision, rejFeedback }) => {
      const updatedVisas = state.visas.map(visa => {
          // Check if the current visa matches the given userAccountId
          if (visa.userAccountId === userAccountId) {
              // Find the document to update based on documentType
              const docToUpdate = visa.docs[documentType as keyof typeof visa.docs];
              if (docToUpdate) {
                  // Update the document with the new status and rejFeedback
                  const updatedDoc: VisaDocument = { 
                      ...docToUpdate, 
                      status: `${documentType}-${hrDecision}`, 
                      rejFeedback: rejFeedback || docToUpdate.rejFeedback 
                  };
                  // Update the docs object with the updated document
                  const updatedDocs = { ...visa.docs, [documentType]: updatedDoc };
  
                  // Return the updated visa with the new docs, visaStatus, and rejFeedback
                  return { 
                      ...visa, 
                      docs: updatedDocs,
                      visaStatus: `${documentType}-${hrDecision}`, // Update visaStatus
                      rejFeedback: rejFeedback || visa.rejFeedback // Update rejFeedback at the visa level
                  };
              }
          }
          // Return the visa as is if no updates are made
          return visa;
      });
      return {
          ...state,
          visas: updatedVisas,
      };
  }),
  

  




  
);
