import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuItem } from '../data-access/model/menu';

@Component({
  standalone: true,
  selector: 'consent-flow-sidebar-nav',
  imports: [AsyncPipe, MatSidenavModule, NgForOf, NgIf, NgClass],
  template: `
    <mat-sidenav-container class="w-full h-screen">
      <mat-sidenav #sidenav mode="side" [opened]="true" class="flex flex-col h-full w-3/12">
        <div class="flex flex-col h-full justify-start items-start text-lg">
          <button
            *ngFor="let menuItem of menuItems"
            (click)="menuSelectedEvent.emit(menuItem.key)"
            class="w-full by-3 border border-y-1 border-x-0 border-gray-400 py-3"
            [ngClass]="{ 'font-bold': menuItem.key === currentMenu }">
            {{ menuItem.text }}
          </button>
        </div>
      </mat-sidenav>
      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class SidebarNavComponent {
  @Input() menuItems: MenuItem[];
  @Input() currentMenu: string | null;
  @Output() menuSelectedEvent = new EventEmitter<string>();
}
