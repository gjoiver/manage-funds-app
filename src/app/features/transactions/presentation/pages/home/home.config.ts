import { ColumnDef } from '@shared/entities';
import { TransactionEntity } from '@transactions/core/entities';

export const HomeConfig = Object.freeze({
  i18n: {
    title: 'Historial de Transacciones',
    subtitle: 'Visualiza todas tus suscripciones y cancelaciones de fondos',
    emptyTitle: 'No hay transacciones',
    emptySubtitle: 'Cuando te suscribas a un fondo, verás el historial aquí',
  },
});

export const TableConfig: ColumnDef<TransactionEntity>[] = [
  {
    header: 'Fecha',
    key: 'date',
    type: 'date',
  },
  {
    header: 'Tipo',
    key: 'typeLabel',
    type: 'text',
  },
  {
    header: 'Fondo',
    key: 'fundName',
    type: 'text',
  },
  {
    header: 'Monto',
    key: 'amount',
    type: 'currency',
  },
  {
    header: 'Notificación',
    key: 'notificationLabel',
    type: 'text',
  },
];
