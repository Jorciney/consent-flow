import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ConsentActions from './consent.actions';
import { ConsentEffects } from './consent.effects';
import { ConsentFacade } from './consent.facade';
import { ConsentEntity } from './consent.models';
import { CONSENT_FEATURE_KEY, ConsentState, initialConsentState, consentReducer } from './consent.reducer';
import * as ConsentSelectors from './consent.selectors';

interface TestSchema {
  consent: ConsentState;
}

describe('ConsentFacade', () => {
  let facade: ConsentFacade;
  let store: Store<TestSchema>;
  const createConsentEntity = (id: string, name = ''): ConsentEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONSENT_FEATURE_KEY, consentReducer),
          EffectsModule.forFeature([ConsentEffects]),
        ],
        providers: [ConsentFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ConsentFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allConsent$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allConsent$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadConsentSuccess` to manually update list
     */
    it('allConsent$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allConsent$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ConsentActions.loadConsentSuccess({
          consent: [createConsentEntity('AAA'), createConsentEntity('BBB')],
        })
      );

      list = await readFirst(facade.allConsent$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
