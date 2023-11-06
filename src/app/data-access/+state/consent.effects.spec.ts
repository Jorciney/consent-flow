import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ConsentActions from './consent.actions';
import { ConsentEffects } from './consent.effects';

describe('ConsentEffects', () => {
  let actions: Observable<Action>;
  let effects: ConsentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ConsentEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(ConsentEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ConsentActions.initConsent() });

      const expected = hot('-a-|', { a: ConsentActions.loadConsentSuccess({ consent: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
