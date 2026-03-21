export interface ColumnDef<T> {
  header: string;
  key: keyof T;
  type?: 'text' | 'currency' | 'date' | 'custom';
}
