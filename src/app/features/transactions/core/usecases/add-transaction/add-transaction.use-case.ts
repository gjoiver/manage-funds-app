import { inject, Injectable } from '@angular/core';
import { TransactionsRepository } from '../../repositories/transactions.repository';
import { TransactionEntity } from '../../entities';

@Injectable()
export class AddTransactionUseCase {
  private readonly transactionsRepository = inject(TransactionsRepository);

  public execute(transaction: TransactionEntity): Promise<void> {
    return this.transactionsRepository.addTransaction(transaction);
  }
}
