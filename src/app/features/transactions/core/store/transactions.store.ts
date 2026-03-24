import { computed, Injectable, signal } from '@angular/core';
import { TransactionEntity } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class TransactionsStore {
  private readonly transactions = signal<TransactionEntity[]>([]);

  public readonly allTransactions = this.transactions.asReadonly();

  public readonly sortedTransactions = computed(() =>
    [...this.allTransactions()].sort((a, b) => b.date.getTime() - a.date.getTime()),
  );

  public addTransaction(transaction: TransactionEntity): void {
    this.transactions.update((current) => [...current, transaction]);
  }

  public getTransactionsByFundId(fundId: string): TransactionEntity[] {
    return this.allTransactions().filter((transaction) => transaction.fundId === fundId);
  }

  public clearTransactions(): void {
    this.transactions.set([]);
  }
}
