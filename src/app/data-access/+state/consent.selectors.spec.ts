import { ConsentEntity } from './consent.models';
import { consentAdapter, ConsentPartialState, initialConsentState } from './consent.reducer';
import * as ConsentSelectors from './consent.selectors';

describe('Consent Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getConsentId = (it: ConsentEntity) => it.id;
  const createConsentEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ConsentEntity);

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
      const result = ConsentSelectors.selectEntity(state) as ConsentEntity;
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
