import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONSENT_FEATURE_KEY, ConsentState, consentAdapter } from './consent.reducer';

// Lookup the 'Consent' feature state managed by NgRx
export const selectConsentState = createFeatureSelector<ConsentState>(CONSENT_FEATURE_KEY);

const { selectAll, selectEntities } = consentAdapter.getSelectors();

export const selectConsentLoaded = createSelector(selectConsentState, (state: ConsentState) => state.loaded);

export const selectConsentError = createSelector(selectConsentState, (state: ConsentState) => state.error);

export const selectAllConsent = createSelector(selectConsentState, (state: ConsentState) => selectAll(state));

export const selectConsentEntities = createSelector(selectConsentState, (state: ConsentState) => selectEntities(state));

export const selectSelectedId = createSelector(selectConsentState, (state: ConsentState) => state.selectedId);

export const selectEntity = createSelector(selectConsentEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
