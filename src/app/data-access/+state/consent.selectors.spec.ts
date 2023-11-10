import { consentAdapter, ConsentPartialState, initialConsentState } from './consent.reducer';
import * as ConsentSelectors from './consent.selectors';
import { Consent } from '../model/consent';

describe('Consent Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getConsentId = (it: Consent) => it.email;
  const createConsentEntity = (id: string, name = '') =>
    ({
      email: id,
      seeTargetAds: false,
      contributeToAnonymousStatistics: false,
      receiveNewsletter: true,
      name: name || `name-${id}`,
    } as Consent);

  let state: ConsentPartialState;

  beforeEach(() => {
    state = {
      consent: consentAdapter.setAll(
        [createConsentEntity('PRODUCT-AAA'), createConsentEntity('PRODUCT-BBB'), createConsentEntity('PRODUCT-CCC')],
        {
          ...initialConsentState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Consent Selectors', () => {
    it('selectAllConsent() should return the list of Consent', () => {
      const results = ConsentSelectors.selectAllConsent(state);
      const selId = getConsentId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ConsentSelectors.selectEntity(state) as Consent;
      const selId = getConsentId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectConsentLoaded() should return the current "loaded" status', () => {
      const result = ConsentSelectors.selectConsentLoaded(state);

      expect(result).toBe(true);
    });

    it('selectConsentError() should return the current "error" state', () => {
      const result = ConsentSelectors.selectConsentError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
