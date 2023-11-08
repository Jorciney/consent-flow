import { Action } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import { ConsentState, initialConsentState, consentReducer } from './consent.reducer';
import { Consent } from '../model/consent';

describe('Consent Reducer', () => {
  const createConsentEntity = (id: string, name = ''): Consent => ({
    email: 'test@gmail.com',
    seeTargetAdds: false,
    contributeToAnonymousStatistics: false,
    receiveNewsletter: true,
    name: name || `name-${id}`,
  });

  describe('valid Consent actions', () => {
    it('loadConsentSuccess should return the list of known Consent', () => {
      const consents = [createConsentEntity('PRODUCT-AAA'), createConsentEntity('PRODUCT-zzz')];
      const action = ConsentActions.loadConsentSuccess({ consents });

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
