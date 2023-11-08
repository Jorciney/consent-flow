import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import { Consent } from '../model/consent';

export const CONSENT_FEATURE_KEY = 'consent';

export interface ConsentState extends EntityState<Consent> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface ConsentPartialState {
  readonly [CONSENT_FEATURE_KEY]: ConsentState;
}

export const consentAdapter: EntityAdapter<Consent> = createEntityAdapter<Consent>({
  selectId: (consent) => consent.email,
});

export const initialConsentState: ConsentState = consentAdapter.getInitialState({
  loaded: false,
});

const reducer = createReducer(
  initialConsentState,
  on(ConsentActions.loadConsents, ConsentActions.addConsent, (state) => ({ ...state, loaded: false, error: null })),
  on(ConsentActions.loadConsentSuccess, (state, { consents }) =>
    consentAdapter.setAll(consents, { ...state, loaded: true })
  ),
  on(ConsentActions.addConsentSuccess, (state, { consent }) =>
    consentAdapter.addOne(consent, { ...state, loaded: true })
  ),

  on(ConsentActions.loadConsentFailure, (state, { error }) => ({ ...state, error }))
);

export const consentReducer = (state: ConsentState | undefined, action: Action) => {
  return reducer(state, action);
};
