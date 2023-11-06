import { createAction, props } from '@ngrx/store';
import { ConsentEntity } from './consent.models';

export const initConsent = createAction('[Consent Page] Init');

export const loadConsentSuccess = createAction(
  '[Consent/API] Load Consent Success',
  props<{ consent: ConsentEntity[] }>()
);

export const loadConsentFailure = createAction('[Consent/API] Load Consent Failure', props<{ error: any }>());
