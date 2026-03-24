import { inject, Injectable, signal } from '@angular/core';
import { FundEntity } from '../entities';
import { TransactionsStore } from '@transactions/core/store';
import { TransactionEntity } from '@transactions/core/entities';
import { TRANSACTION_TYPES } from '@transactions/core/constants';
import { NotificationEntity } from '@shared/entities';

@Injectable({ providedIn: 'root' })
export class AccountStore {
  private readonly transactionsStore = inject(TransactionsStore);

  private readonly balance = signal<number>(500000);
  private readonly subscribedFunds = signal<FundEntity[]>([]);

  public getBalance(): number {
    return this.balance();
  }

  public getSubscribedFunds(): FundEntity[] {
    return this.subscribedFunds();
  }

  public hasEnoughBalance(minAmount: number): boolean {
    return this.getBalance() >= minAmount;
  }

  public hasSubscription(id: number): boolean {
    return this.getSubscribedFunds().some((subsFund) => subsFund.id === id);
  }

  public subscribeToFund(fund: FundEntity, notificationMethod: NotificationEntity): void {
    this.balance.update((balance) => balance - fund.minAmount);
    this.subscribedFunds.update((funds) => [...funds, fund]);

    const transaction: TransactionEntity = {
      id: crypto.randomUUID(),
      fundId: fund.id.toString(),
      fundName: fund.name,
      type: TRANSACTION_TYPES.Subscription,
      amount: fund.minAmount,
      date: new Date(),
      notificationMethod,
    };

    this.transactionsStore.addTransaction(transaction);
  }

  public unsubscribeFund(fund: FundEntity): void {
    this.balance.update((currentBalance) => currentBalance + fund.minAmount);
    this.subscribedFunds.update((funds) => funds.filter((subsFund) => subsFund.id !== fund.id));

    const transaction: TransactionEntity = {
      id: crypto.randomUUID(),
      fundId: fund.id.toString(),
      fundName: fund.name,
      type: TRANSACTION_TYPES.Unsubscription,
      amount: fund.minAmount,
      date: new Date(),
    };

    this.transactionsStore.addTransaction(transaction);
  }
}
