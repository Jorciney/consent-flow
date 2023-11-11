import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'consent-flow-pagination',
  template: `
    <div class="w-full flex flex-row justify-between items-center gap-5 text-blue-600">
      <a
        *ngIf="currentPage !== 0; else emptyPlaceholder"
        (click)="changePage.emit(currentPage - 1)"
        class="mr-40 p-1 cursor-pointer"
        ><< Previous page</a
      >
      <div class="flex flex-row">
        <ng-container *ngFor="let page of [].constructor(totalPages); let i = index; last as isLast">
          <div
            [attr.data-cy]="isLast ? 'lastPage' : 'pageNumber' + (i + 1)"
            (click)="changePage.emit(i)"
            class="p-1 cursor-pointer"
            [ngClass]="{ 'font-bold': currentPage === i }">
            {{ i + 1 }}
          </div>
        </ng-container>
      </div>
      <a
        *ngIf="currentPage !== totalPages - 1; else emptyPlaceholder"
        (click)="changePage.emit(currentPage + 1)"
        class="ml-40 p-1 cursor-pointer"
        >Next page >></a
      >
    </div>
    <ng-template #emptyPlaceholder>
      <div class="w-60"></div>
    </ng-template>
  `,
  imports: [NgForOf, NgClass, NgIf],
})
export class PaginationComponent {
  @Output() changePage = new EventEmitter<number>();
  @Input() currentPage: number = 0;
  @Input() totalPages: number;
}
