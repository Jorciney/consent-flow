import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import { Consent } from '../model/consent';
import { QueryPage } from '../model/table';

export const CONSENT_FEATURE_KEY = 'consent';

export interface ConsentState extends EntityState<Consent> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  page?: QueryPage;
}

export interface ConsentPartialState {
  readonly [CONSENT_FEATURE_KEY]: ConsentState;
}

export const consentAdapter: EntityAdapter<Consent> = createEntityAdapter<Consent>({
  selectId: (consent) => consent.email,
});

export const initialConsentState: ConsentState = consentAdapter.getInitialState({
  loaded: false,
  page: { start: 0, count: 0, size: 0 },
});

const reducer = createReducer(
  initialConsentState,
  on(ConsentActions.loadConsents, ConsentActions.addConsent, (state) => ({ ...state, loaded: false, error: null })),
  on(ConsentActions.loadConsentSuccess, (state, { consentsPage }) =>
    consentAdapter.setAll(consentsPage.data || [], {
      ...state,
      loaded: true,
      page: { start: consentsPage.start || 0, count: consentsPage.count || 0, size: consentsPage.size },
    })
  ),
  on(ConsentActions.addConsentSuccess, (state, { consent }) => ({ ...state, loaded: true, error: null })),

  on(ConsentActions.loadConsentFailure, (state, { error }) => ({ ...state, error }))
);

export const consentReducer = (state: ConsentState | undefined, action: Action) => {
  return reducer(state, action);
};
