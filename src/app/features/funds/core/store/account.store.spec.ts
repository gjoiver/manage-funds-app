import { TestBed } from '@angular/core/testing';
import { AccountStore } from './account.store';
import { TransactionsStore } from '@transactions/core/store';
import { GET_FUNDS_MOCK } from '@funds/data/mocks';
import { NOTIFICATIONS_TYPES } from '@shared/constants';
import { TRANSACTION_TYPES } from '@transactions/core/constants';

describe(`AccountStore`, () => {
  let store: AccountStore;
  let transactionsStore: TransactionsStore;

  const fund = GET_FUNDS_MOCK.data[0];
  const secondFund = GET_FUNDS_MOCK.data[1];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(AccountStore);
    transactionsStore = TestBed.inject(TransactionsStore);
  });

  it(`Given the initial state
    When getBalance is called
    Then returns 500000`, () => {
    // Arrange

    // Act
    const balance = store.getBalance();

    // Assert
    expect(balance).toBe(500000);
  });

  it(`Given the initial state
    When getSubscribedFunds is called
    Then returns an empty array`, () => {
    // Arrange

    // Act
    const funds = store.getSubscribedFunds();

    // Assert
    expect(funds).toEqual([]);
  });

  it(`Given a fund whose minAmount is within the current balance
    When hasEnoughBalance is called
    Then returns true`, () => {
    // Arrange
    const minAmount = 75000;

    // Act
    const result = store.hasEnoughBalance(minAmount);

    // Assert
    expect(result).toBe(true);
  });

  it(`Given a fund whose minAmount exceeds the current balance
    When hasEnoughBalance is called
    Then returns false`, () => {
    // Arrange
    const minAmount = 1_000_000;

    // Act
    const result = store.hasEnoughBalance(minAmount);

    // Assert
    expect(result).toBe(false);
  });

  it(`Given a fund that has not been subscribed
    When hasSubscription is called
    Then returns false`, () => {
    // Arrange
    const fundId = fund.id;

    // Act
    const result = store.hasSubscription(fundId);

    // Assert
    expect(result).toBe(false);
  });

  it(`Given a valid fund and notification method
    When subscribeToFund is called
    Then deducts the minAmount from the balance`, () => {
    // Arrange
    const initialBalance = store.getBalance();

    // Act
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);

    // Assert
    expect(store.getBalance()).toBe(initialBalance - fund.minAmount);
  });

  it(`Given a valid fund and notification method
    When subscribeToFund is called
    Then adds the fund to subscribed funds`, () => {
    // Arrange (fund is not yet subscribed)

    // Act
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);

    // Assert
    expect(store.hasSubscription(fund.id)).toBe(true);
  });

  it(`Given a valid fund and notification method
    When subscribeToFund is called
    Then registers a subscription transaction`, () => {
    // Arrange
    jest.spyOn(transactionsStore, 'addTransaction');

    // Act
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);

    // Assert
    expect(transactionsStore.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        fundId: fund.id.toString(),
        type: TRANSACTION_TYPES.Subscription,
        amount: fund.minAmount,
        notificationMethod: NOTIFICATIONS_TYPES.Email,
      }),
    );
  });

  it(`Given a previously subscribed fund
    When unsubscribeFund is called
    Then restores the minAmount to the balance`, () => {
    // Arrange
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);
    const balanceAfterSubscription = store.getBalance();

    // Act
    store.unsubscribeFund(fund);

    // Assert
    expect(store.getBalance()).toBe(balanceAfterSubscription + fund.minAmount);
  });

  it(`Given a previously subscribed fund
    When unsubscribeFund is called
    Then removes the fund from subscribed funds`, () => {
    // Arrange
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);

    // Act
    store.unsubscribeFund(fund);

    // Assert
    expect(store.hasSubscription(fund.id)).toBe(false);
  });

  it(`Given a previously subscribed fund
    When unsubscribeFund is called
    Then registers an unsubscription transaction`, () => {
    // Arrange
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);
    jest.spyOn(transactionsStore, 'addTransaction');

    // Act
    store.unsubscribeFund(fund);

    // Assert
    expect(transactionsStore.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        fundId: fund.id.toString(),
        type: TRANSACTION_TYPES.Unsubscription,
        amount: fund.minAmount,
      }),
    );
  });

  it(`Given multiple subscribed funds
    When one fund is unsubscribed
    Then other subscribed funds remain intact`, () => {
    // Arrange
    store.subscribeToFund(fund, NOTIFICATIONS_TYPES.Email);
    store.subscribeToFund(secondFund, NOTIFICATIONS_TYPES.Sms);

    // Act
    store.unsubscribeFund(fund);

    // Assert
    expect(store.hasSubscription(secondFund.id)).toBe(true);
  });
});
