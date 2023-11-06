import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CONSENT_FEATURE_KEY, consentReducer } from './data-access/+state/consent.reducer';
import { ConsentEffects } from './data-access/+state/consent.effects';
import { ConsentFlowViewComponent } from './consent-flow-view.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ConsentFlowViewComponent,
    providers: [provideState(CONSENT_FEATURE_KEY, consentReducer), provideEffects(ConsentEffects)],
  },
];
