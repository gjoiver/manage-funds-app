import { CurrencyPipe, DatePipe, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ColumnDef, DynamicComponentCell } from '@shared/entities';
import { SkeletonDirective } from '@shared/directives';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe, NgComponentOutlet, SkeletonDirective],
})
export class CardComponent<T> {
  public row = input<T>();
  public columns = input.required<ColumnDef<T>[]>();
  public skeleton = input<boolean>(false);

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
