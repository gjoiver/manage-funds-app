import { TransactionsRepository } from '@transactions/core/repositories/transactions.repository';
import { TransactionEntity } from '@transactions/core/entities';
import { TRANSACTIONS_MOCK } from './transaction.mock';

export class TransactionsRepositoryMock extends TransactionsRepository {
  public getTransactions(): Promise<TransactionEntity[]> {
    return Promise.resolve(TRANSACTIONS_MOCK);
  }
  public addTransaction(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
