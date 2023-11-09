import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgForOf, NgIf } from '@angular/common';
import { QueryPage, TableMetadata } from '../data-access/model/table';
import { PaginationComponent } from './pagination.component';

@Component({
  standalone: true,
  selector: 'consent-flow-consent-table',
  template: `
    <div class="flex flex-col gap-2 justify-center items-center w-full">
      <table mat-table [dataSource]="dataSource || []" class="mat-elevation-z8">
        <ng-container *ngFor="let metadata of metadataList">
          <ng-container [matColumnDef]="metadata.prop">
            <th mat-header-cell *matHeaderCellDef>{{ metadata.title }}</th>
            <td mat-cell *matCellDef="let element">{{ element[metadata.prop] }}</td>
          </ng-container>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columnNames"></tr>
        <tr mat-row *matRowDef="let row; columns: columnNames"></tr>
      </table>
      <consent-flow-pagination
        class="w-full"
        *ngIf="page"
        [totalPages]="page.size! / page.count"
        (changePage)="changePage.emit($event)"
        [currentPage]="Math.ceil((page.start + 1) / page.count) - 1"></consent-flow-pagination>
    </div>
  `,
  imports: [MatTableModule, NgForOf, PaginationComponent, NgIf],
})
export class ConsentTableComponent {
  @Input() dataSource: unknown[] | null;
  @Input() page: QueryPage;
  @Input() metadataList: TableMetadata[];
  @Output() changePage = new EventEmitter<number>();

  get columnNames(): string[] {
    return this.metadataList?.map((metadata) => metadata.prop) || [];
  }

  protected readonly Math = Math;
}
