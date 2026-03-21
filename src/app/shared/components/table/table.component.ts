import { CurrencyPipe, DatePipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { ColumnDef, DynamicComponentCell } from '@shared/entities';
import { TableComponentConfig } from './table.config';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe, NgTemplateOutlet, NgComponentOutlet],
})
export class TableComponent<T> {
  public config = TableComponentConfig;
  public data = input.required<T[]>();
  public columns = input.required<ColumnDef<T>[]>();
  public isLoading = input<boolean>();
  public customTemplate = contentChild<TemplateRef<any>>('customTemplate');

  public getCellValue(row: T, key: keyof T | string): string | number | null | undefined {
    const value = (row as any)[key];

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value === null ||
      value === undefined
    ) {
      return value;
    }

    return String(value);
  }

  public getDynamicCell(col: ColumnDef<T>, row: T, index: number): DynamicComponentCell | null {
    if (col.component && typeof col.component === 'function') {
      return col.component(row, index);
    }

    return null;
  }
}
