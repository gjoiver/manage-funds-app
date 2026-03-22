import { inject, Injectable } from '@angular/core';
import { TransactionsRepository } from '@transactions/core/repositories/transactions.repository';
import { TransactionsStore } from '@transactions/core/store';
import { TransactionEntity } from '@transactions/core/entities';
import { TransactionsMapper } from '@transactions/data/mappers';

@Injectable()
export class TransactionsImplementationRepository implements TransactionsRepository {
  private readonly transactionsStore = inject(TransactionsStore);

  public getTransactions(): Promise<TransactionEntity[]> {
    return Promise.resolve(TransactionsMapper.from(this.transactionsStore.sortedTransactions()));
  }

  public addTransaction(transaction: TransactionEntity): Promise<void> {
    this.transactionsStore.addTransaction(transaction);
    return Promise.resolve();
  }
}
