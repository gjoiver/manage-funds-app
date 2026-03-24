import { TestBed } from '@angular/core/testing';
import { TransactionsStore } from './transactions.store';
import { TRANSACTION_MOCK, TRANSACTION_MOCK_2, TRANSACTIONS_MOCK } from '@transactions/data/mocks/transaction.mock';

describe(`TransactionsStore`, () => {
  let store: TransactionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(TransactionsStore);
  });

  it(`Given a new store instance
    When accessing allTransactions
    Then returns an empty array`, () => {
    // Arrange (initial state)

    // Act
    const result = store.allTransactions();

    // Assert
    expect(result).toEqual([]);
  });

  it(`Given a new store instance
    When accessing sortedTransactions
    Then returns an empty array`, () => {
    // Arrange (initial state)

    // Act
    const result = store.sortedTransactions();

    // Assert
    expect(result).toEqual([]);
  });

  it(`Given a transaction
    When addTransaction is called
    Then the transaction appears in allTransactions`, () => {
    // Arrange
    const transaction = TRANSACTION_MOCK;

    // Act
    store.addTransaction(transaction);

    // Assert
    expect(store.allTransactions()).toContain(transaction);
  });

  it(`Given a transaction
    When addTransaction is called
    Then allTransactions count increases by one`, () => {
    // Arrange
    const initialCount = store.allTransactions().length;

    // Act
    store.addTransaction(TRANSACTION_MOCK);

    // Assert
    expect(store.allTransactions().length).toBe(initialCount + 1);
  });

  it(`Given multiple transactions with different dates
    When accessing sortedTransactions
    Then transactions are ordered newest first`, () => {
    // Arrange
    TRANSACTIONS_MOCK.forEach((t) => store.addTransaction(t));

    // Act
    const result = store.sortedTransactions();

    // Assert
    expect(result[0].date.getTime()).toBeGreaterThanOrEqual(result[1].date.getTime());
  });

  it(`Given multiple transactions
    When accessing sortedTransactions
    Then returns a new array without mutating allTransactions`, () => {
    // Arrange
    store.addTransaction(TRANSACTION_MOCK);
    store.addTransaction(TRANSACTION_MOCK_2);

    // Act
    const sorted = store.sortedTransactions();
    const all = store.allTransactions();

    // Assert
    expect(sorted).not.toBe(all);
  });

  it(`Given transactions for different funds
    When getTransactionsByFundId is called with a specific fundId
    Then returns only matching fund transactions`, () => {
    // Arrange
    TRANSACTIONS_MOCK.forEach((t) => store.addTransaction(t));

    // Act
    const result = store.getTransactionsByFundId('1');

    // Assert
    expect(result.every((t) => t.fundId === '1')).toBe(true);
  });

  it(`Given transactions for different funds
    When getTransactionsByFundId is called with a specific fundId
    Then does not include transactions from other funds`, () => {
    // Arrange
    TRANSACTIONS_MOCK.forEach((t) => store.addTransaction(t));

    // Act
    const result = store.getTransactionsByFundId('1');

    // Assert
    expect(result.some((t) => t.fundId === '2')).toBe(false);
  });

  it(`Given transactions in the store
    When clearTransactions is called
    Then allTransactions becomes empty`, () => {
    // Arrange
    store.addTransaction(TRANSACTION_MOCK);

    // Act
    store.clearTransactions();

    // Assert
    expect(store.allTransactions()).toEqual([]);
  });
});
