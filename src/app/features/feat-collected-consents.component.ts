import { Component, inject } from '@angular/core';
import { ConsentTableComponent } from '../ui/consent-table.component';
import { ConsentFacade } from '../data-access/+state/consent.facade';
import { QueryPage, TableMetadata } from '../data-access/model/table';
import { AsyncPipe, NgIf } from '@angular/common';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'consent-flow-collected-consents',
  template: `
    <ng-container *ngIf="page$ | async as page">
      <consent-flow-consent-table
        [dataSource]="consents$ | async"
        [page]="page"
        (changePage)="changePage($event, page)"
        [metadataList]="consentTableMetadataList"></consent-flow-consent-table>
    </ng-container>
  `,
  imports: [ConsentTableComponent, AsyncPipe, NgIf],
})
export class FeatCollectedConsentsComponent {
  consentTableMetadataList: TableMetadata[] = [
    { prop: 'name', title: 'Name' },
    { prop: 'email', title: 'Email' },
    { prop: 'consentGiven', title: 'Consent given for' },
  ];
  private readonly consentFacade = inject(ConsentFacade);
  page$ = this.consentFacade.page$;
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

  changePage(pageNumber: number, currentQuery: QueryPage) {
    this.consentFacade.loadConsents({
      count: 2,
      start: pageNumber * currentQuery.count,
    });
  }
}
