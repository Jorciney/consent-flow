import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import { ConsentEntity } from './consent.models';

export const CONSENT_FEATURE_KEY = 'consent';

export interface ConsentState extends EntityState<ConsentEntity> {
  selectedId?: string | number; // which Consent record has been selected
  loaded: boolean; // has the Consent list been loaded
  error?: string | null; // last known error (if any)
}

export interface ConsentPartialState {
  readonly [CONSENT_FEATURE_KEY]: ConsentState;
}

export const consentAdapter: EntityAdapter<ConsentEntity> = createEntityAdapter<ConsentEntity>();

export const initialConsentState: ConsentState = consentAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialConsentState,
  on(ConsentActions.initConsent, (state) => ({ ...state, loaded: false, error: null })),
  on(ConsentActions.loadConsentSuccess, (state, { consent }) =>
    consentAdapter.setAll(consent, { ...state, loaded: true })
  ),
  on(ConsentActions.loadConsentFailure, (state, { error }) => ({ ...state, error }))
);

export const consentReducer = (state: ConsentState | undefined, action: Action) => {
  return reducer(state, action);
};
