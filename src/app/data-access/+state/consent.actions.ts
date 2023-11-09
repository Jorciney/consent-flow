import { createAction, props } from '@ngrx/store';
import { Consent } from '../model/consent';
import { DataWithPagination, QueryPage } from '../model/table';

export const loadConsents = createAction('[Consent/API] Load Consents', props<{ query?: QueryPage }>());

export const loadConsentSuccess = createAction(
  '[Consent/API] Load Consent Success',
  props<{ consentsPage: DataWithPagination<Consent> }>()
);

export const addConsent = createAction('[Consent/API] Add Consent', props<{ consent: Consent }>());

export const addConsentSuccess = createAction('[Consent/API] Add Consent Success', props<{ consent: Consent }>());

export const loadConsentFailure = createAction('[Consent/API] Load Consent Failure', props<{ error: any }>());
