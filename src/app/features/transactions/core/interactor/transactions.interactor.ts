import { inject, Injectable } from '@angular/core';
import { GetTransactionsUseCase, AddTransactionUseCase } from '@transactions/core/usecases';
import { TransactionEntity } from '../entities';

@Injectable()
export class TransactionsInteractor {
  private readonly getTransactionsUseCase = inject(GetTransactionsUseCase);
  private readonly addTransactionUseCase = inject(AddTransactionUseCase);

  public getTransactions(): Promise<TransactionEntity[]> {
    return this.getTransactionsUseCase.execute();
  }

  public addTransaction(transaction: TransactionEntity): Promise<void> {
    return this.addTransactionUseCase.execute(transaction);
  }
}
