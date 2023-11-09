import { Component, inject } from '@angular/core';
import { ConsentTableComponent } from '../ui/consent-table.component';
import { ConsentFacade } from '../data-access/+state/consent.facade';
import { TableMetadata } from '../data-access/model/table';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'consent-flow-collected-consents',
  template: `
    <consent-flow-consent-table
      [dataSource]="consents$ | async"
      [metadataList]="consentTableMetadataList"></consent-flow-consent-table>
  `,
  imports: [ConsentTableComponent, AsyncPipe],
})
export class FeatCollectedConsentsComponent {
  consentTableMetadataList: TableMetadata[] = [
    { prop: 'name', title: 'Name' },
    { prop: 'email', title: 'Email' },
    { prop: 'consentGiven', title: 'Consent given for' },
  ];
  private readonly consentFacade = inject(ConsentFacade);
  consents$ = this.consentFacade.allConsent$.pipe(
    map((consents) =>
      consents.map((consent) => {
        const consentGiven = [];
        if (consent.receiveNewsletter) {
          consentGiven.push('Received newsletter');
        }
        if (consent.seeTargetAds) {
          consentGiven.push('Be shown target ads');
        }
        if (consent.contributeToAnonymousStatistics) {
          consentGiven.push('Contribute to anonymous visit statistics');
        }
        return { name: consent.name, email: consent.email, consentGiven: consentGiven.join(', ') };
      })
    )
  );
}
