import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgForOf } from '@angular/common';
import { TableMetadata } from '../data-access/model/table';

@Component({
  standalone: true,
  selector: 'consent-flow-consent-table',
  template: `
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
  `,
  imports: [MatTableModule, NgForOf],
})
export class ConsentTableComponent {
  @Input() dataSource: unknown[] | null;
  @Input() metadataList: TableMetadata[];

  get columnNames(): string[] {
    return this.metadataList?.map((metadata) => metadata.prop) || [];
  }
}
