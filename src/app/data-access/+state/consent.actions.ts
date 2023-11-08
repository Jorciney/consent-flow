import { createAction, props } from '@ngrx/store';
import { Consent } from '../model/consent';

export const loadConsents = createAction('[Consent/API] Load Consents');

export const loadConsentSuccess = createAction('[Consent/API] Load Consent Success', props<{ consents: Consent[] }>());

export const addConsent = createAction('[Consent/API] Add Consent', props<{ consent: Consent }>());

export const addConsentSuccess = createAction('[Consent/API] Add Consent Success', props<{ consent: Consent }>());

export const loadConsentFailure = createAction('[Consent/API] Load Consent Failure', props<{ error: any }>());
