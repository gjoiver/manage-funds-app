import { TransactionEntity } from '@transactions/core/entities/transaction.entity';
import { TRANSACTION_TYPES } from '@transactions/core/constants';

export const TRANSACTION_MOCK: TransactionEntity = {
  id: 'uuid-mock-1',
  fundId: '1',
  fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
  type: TRANSACTION_TYPES.Subscription,
  amount: 75000,
  date: new Date('2024-01-15T10:00:00'),
  notificationMethod: 'email',
};

export const TRANSACTION_MOCK_2: TransactionEntity = {
  id: 'uuid-mock-2',
  fundId: '2',
  fundName: 'FPV_BTG_PACTUAL_ECOPETROL',
  type: TRANSACTION_TYPES.Unsubscription,
  amount: 125000,
  date: new Date('2024-01-16T11:00:00'),
};

export const TRANSACTIONS_MOCK: TransactionEntity[] = [TRANSACTION_MOCK, TRANSACTION_MOCK_2];
