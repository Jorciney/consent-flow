import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ConsentActions from './consent.actions';
import { ConsentEffects } from './consent.effects';
import { ConsentFacade } from './consent.facade';
import { CONSENT_FEATURE_KEY, consentReducer, ConsentState } from './consent.reducer';
import { Consent } from '../model/consent';
import { HttpClientTestingModule } from '@angular/common/http/testing';

interface TestSchema {
  consent: ConsentState;
}

describe('ConsentFacade', () => {
  let facade: ConsentFacade;
  let store: Store<TestSchema>;
  const createConsentEntity = (id: string, name = ''): Consent => ({
    email: id,
    seeTargetAds: false,
    contributeToAnonymousStatistics: false,
    receiveNewsletter: true,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONSENT_FEATURE_KEY, consentReducer),
          EffectsModule.forFeature([ConsentEffects]),
          HttpClientTestingModule,
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
     * Use `loadConsentSuccess` to manually update list
     */
    it('allConsent$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allConsent$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ConsentActions.loadConsentSuccess({
          consentsPage: {
            start: 0,
            count: 0,
            size: 0,
            data: [createConsentEntity('AAA'), createConsentEntity('BBB')],
          },
        })
      );

      list = await readFirst(facade.allConsent$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
