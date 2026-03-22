import { FundEntity } from '@funds/core/entities';

import { HomePage } from './home.page';
import { ColumnDef } from '@shared/entities';
import { BaseButtonComponent } from '@shared/components';

export const HomePageConfig = Object.freeze({});

export const TableConfig = (componentRef: HomePage): ColumnDef<FundEntity>[] => [
  { header: 'Fondo', key: 'name', type: 'text' },
  { header: 'Categoria', key: 'category', type: 'text' },
  { header: 'Monto minimo', key: 'minAmount', type: 'currency' },
  {
    header: 'Acción',
    key: 'action',
    type: 'custom',
    component: (row: FundEntity, _index: number) => ({
      class: BaseButtonComponent,
      inputs: {
        label: componentRef.hasSubscription(row) ? 'Retirarse' : 'Subscribirse',
        buttonClick: () => componentRef.subscribeFund(row),
      },
    }),
  },
];
