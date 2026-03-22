import { FundsRepository } from '@funds/core/repositories/funds.repository';
import { FundsImplementationRepository } from '@funds/data/repositories/funds/funds-implementation.repository';
import { TransactionsRepository } from '@transactions/core/repositories/transactions.repository';
import { TransactionsImplementationRepository } from '@transactions/data/repositories/transactions/transactions-implementation.repository';

export const serviceProvider = [
  {
    provide: FundsRepository,
    useClass: FundsImplementationRepository,
  },
  {
    provide: TransactionsRepository,
    useClass: TransactionsImplementationRepository,
  },
];
