import { NotificationEntity } from '@shared/entities';
import { TRANSACTION_TYPES, TransactionType } from '../constants';

export interface TransactionEntity {
  id: string;
  fundId: string;
  fundName: string;
  type: TransactionType;
  amount: number;
  date: Date;
  notificationMethod?: NotificationEntity;
  typeLabel?: string;
  notificationLabel?: string;
}

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  [TRANSACTION_TYPES.Subscription]: 'Suscripción',
  [TRANSACTION_TYPES.Unsubscription]: 'Cancelación',
};
