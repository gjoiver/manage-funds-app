import { inject, Injectable } from '@angular/core';
import { TransactionsRepository } from '../../repositories/transactions.repository';
import { TransactionEntity } from '../../entities';

@Injectable()
export class GetTransactionsUseCase {
  private readonly transactionsRepository = inject(TransactionsRepository);

  public execute(): Promise<TransactionEntity[]> {
    return this.transactionsRepository.getTransactions();
  }
}
