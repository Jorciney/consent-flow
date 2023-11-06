import { Action } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import { ConsentEntity } from './consent.models';
import { ConsentState, initialConsentState, consentReducer } from './consent.reducer';

describe('Consent Reducer', () => {
  const createConsentEntity = (id: string, name = ''): ConsentEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Consent actions', () => {
    it('loadConsentSuccess should return the list of known Consent', () => {
      const consent = [createConsentEntity('PRODUCT-AAA'), createConsentEntity('PRODUCT-zzz')];
      const action = ConsentActions.loadConsentSuccess({ consent });

      const result: ConsentState = consentReducer(initialConsentState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = consentReducer(initialConsentState, action);

      expect(result).toBe(initialConsentState);
    });
  });
});
