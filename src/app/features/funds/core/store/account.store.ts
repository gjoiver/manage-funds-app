import { Injectable, signal } from '@angular/core';
import { FundEntity } from '../entities';

@Injectable({ providedIn: 'root' })
export class AccountStore {
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

  public subscribeToFund(fund: FundEntity): void {
    this.balance.update((balance) => balance - fund.minAmount);
    this.subscribedFunds.update((funds) => [...funds, fund]);
  }

  public unsubscribeFund(fund: FundEntity): void {
    this.balance.update((currentBalance) => currentBalance + fund.minAmount);
    this.subscribedFunds.update((funds) => funds.filter((subsFund) => subsFund.id !== fund.id));
  }
}
