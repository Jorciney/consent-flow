import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'consent-flow-pagination',
  template: `
    <div class="w-full flex flex-row justify-between items-center gap-5 text-blue-600">
      <a (click)="previousClick.emit()" class="p-1 cursor-pointer"><< Previous page</a>
      <div class="flex flex-row">
        <ng-container *ngFor="let page of [].constructor(totalPages); let i = index">
          <div
            (click)="pageClick.emit(page)"
            class="p-1 cursor-pointer"
            [ngClass]="{ 'font-bold': currentPage === i + 1 }">
            {{ i + 1 }}
          </div>
        </ng-container>
      </div>
      <a (click)="nextClick.emit()" class="p-1 cursor-pointer">Next page >></a>
    </div>
  `,
  imports: [NgForOf, NgClass],
})
export class PaginationComponent {
  @Output() previousClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
  @Output() pageClick = new EventEmitter<number>();
  @Input() currentPage: number;
  @Input() totalPages?: number;
}
