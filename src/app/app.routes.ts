import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CONSENT_FEATURE_KEY, consentReducer } from './data-access/+state/consent.reducer';
import { ConsentEffects } from './data-access/+state/consent.effects';
import { FeatConsentFlowViewComponent } from './features/feat-consent-flow-view.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'give-consent',
  },
  {
    path: ':menuItem',
    component: FeatConsentFlowViewComponent,
    providers: [provideState(CONSENT_FEATURE_KEY, consentReducer), provideEffects(ConsentEffects)],
  },
];
