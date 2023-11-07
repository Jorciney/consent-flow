import { Component, inject } from '@angular/core';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FeatGiveConsentComponent } from './feat-give-consent.component';
import { FeatCollectedConsentsComponent } from './feat-collected-consents.component';
import { SidebarNavComponent } from '../ui/sidebar-nav.component';
import { MenuItem } from '../shared/model/menu';

@Component({
  standalone: true,
  selector: 'consent-flow-view',
  imports: [
    FeatGiveConsentComponent,
    FeatCollectedConsentsComponent,
    NgForOf,
    NgIf,
    FormsModule,
    MatButtonModule,
    AsyncPipe,
    NgClass,
    SidebarNavComponent,
  ],
  providers: [MatDrawerContainer],
  template: `
    <consent-flow-sidebar-nav
      *ngIf="currentMenuItem$ | async as currentMenu"
      [currentMenu]="currentMenu"
      [menuItems]="menuItems"
      (menuSelectedEvent)="openMenu($event)">
      <div class="flex flex-col justify-center items-center w-full mt-20">
        <consent-flow-give-consent
          [hidden]="currentMenu !== 'give-consent'"
          (redirectToConsentOverview)="openMenu('consents')"
          class="w-10/12"></consent-flow-give-consent>
        <consent-flow-collected-consents [hidden]="currentMenu !== 'consents'"></consent-flow-collected-consents>
      </div>
    </consent-flow-sidebar-nav>
  `,
})
export class FeatConsentFlowViewComponent {
  menuItems: MenuItem[] = [
    { key: 'give-consent', text: 'Give consent' },
    { key: 'consents', text: 'Collected consents' },
  ];
  private readonly route = inject(ActivatedRoute);
  currentMenuItem$: Observable<string> = this.route.params.pipe(map((params) => params['menuItem']));
  private readonly router = inject(Router);

  openMenu = (menuItem: string) => this.router.navigate([menuItem]);
}
