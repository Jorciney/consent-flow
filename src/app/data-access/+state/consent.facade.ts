import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ConsentActions from './consent.actions';
import * as ConsentFeature from './consent.reducer';
import * as ConsentSelectors from './consent.selectors';
import { Consent } from '../model/consent';

@Injectable({ providedIn: 'root' })
export class ConsentFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(ConsentSelectors.selectConsentLoaded));
  allConsent$ = this.store.pipe(select(ConsentSelectors.selectAllConsent));
  selectedConsent$ = this.store.pipe(select(ConsentSelectors.selectEntity));

  loadConsents() {
    this.store.dispatch(ConsentActions.loadConsents());
  }
  addConsent(consent: Consent) {
    this.store.dispatch(ConsentActions.addConsent({ consent }));
  }
}
