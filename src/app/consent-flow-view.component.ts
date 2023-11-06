import { Component } from '@angular/core';
import { FeatGiveConsentComponent } from './features/feat-give-consent.component';
import { FeatCollectedConsentsComponent } from './features/feat-collected-consents.component';

@Component({
  standalone: true,
  selector: 'consent-flow-view',
  imports: [FeatGiveConsentComponent, FeatCollectedConsentsComponent],
  template: `
    <div class="flex flex-col bg-amber-500">
      <consent-flow-give-consent></consent-flow-give-consent>
      <consent-flow-collected-consents></consent-flow-collected-consents>
    </div>
  `,
})
export class ConsentFlowViewComponent {}
