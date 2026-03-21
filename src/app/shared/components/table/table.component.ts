import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ColumnDef } from '@shared/entities';
import { TableComponentConfig } from './table.config';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
})
export class TableComponent<T> {
  public config = TableComponentConfig;
  public data = input.required<T[]>();
  public columns = input.required<ColumnDef<T>[]>();
  public isLoading = input<boolean>();
  public readonly rowClick = output<T>();

  public onRowClick(item: T): void {
    this.rowClick.emit(item);
  }

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
}
