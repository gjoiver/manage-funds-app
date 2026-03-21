import { Type } from '@angular/core';

export interface DynamicComponentCell {
  class: Type<unknown>;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, (event: any) => void>;
}
export interface ColumnDef<T> {
  header: string;
  key: keyof T | string;
  type?: 'text' | 'currency' | 'date' | 'custom';
  component?: (row: T, index: number) => DynamicComponentCell;
}
