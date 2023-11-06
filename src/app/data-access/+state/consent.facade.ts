import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import * as ConsentFeature from './consent.reducer';
import * as ConsentSelectors from './consent.selectors';

@Injectable({ providedIn: 'root' })
export class ConsentFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ConsentSelectors.selectConsentLoaded));
  allConsent$ = this.store.pipe(select(ConsentSelectors.selectAllConsent));
  selectedConsent$ = this.store.pipe(select(ConsentSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ConsentActions.initConsent());
  }
}
