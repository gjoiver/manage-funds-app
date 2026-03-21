import { FundEntity } from '@funds/core/entities';
import { ColumnDef } from '@shared/entities';

export const HomePageConfig = Object.freeze({
  tableConfig: [
    { header: 'Fondo', key: 'name', type: 'text' },
    { header: 'Categoria', key: 'category', type: 'text' },
    { header: 'Monto minimo', key: 'minAmount', type: 'currency' },
  ] as ColumnDef<FundEntity>[],
});
