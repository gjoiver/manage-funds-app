import { TestBed } from '@angular/core/testing';
import { TransactionsImplementationRepository } from './transactions-implementation.repository';
import { TransactionsStore } from '@transactions/core/store';
import { TRANSACTION_MOCK, TRANSACTIONS_MOCK } from '@transactions/data/mocks/transaction.mock';

describe(`TransactionsImplementationRepository`, () => {
  let repository: TransactionsImplementationRepository;
  let transactionsStore: TransactionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionsImplementationRepository],
    });

    repository = TestBed.inject(TransactionsImplementationRepository);
    transactionsStore = TestBed.inject(TransactionsStore);
  });

  it(`Given transactions in the store
    When getTransactions is called
    Then returns the mapped transactions`, async () => {
    // Arrange
    TRANSACTIONS_MOCK.forEach((transaction) => transactionsStore.addTransaction(transaction));

    // Act
    const result = await repository.getTransactions();

    // Assert
    expect(result.length).toBe(TRANSACTIONS_MOCK.length);
  });

  it(`Given transactions in the store
    When getTransactions is called
    Then returns transactions with typeLabel mapped`, async () => {
    // Arrange
    transactionsStore.addTransaction(TRANSACTION_MOCK);

    // Act
    const result = await repository.getTransactions();

    // Assert
    expect(result[0].typeLabel).toBeDefined();
  });

  it(`Given a transaction to add
    When addTransaction is called
    Then resolves without errors`, async () => {
    // Arrange
    const transaction = TRANSACTION_MOCK;

    // Act & Assert
    await expect(repository.addTransaction(transaction)).resolves.toBeUndefined();
  });

  it(`Given a transaction to add
    When addTransaction is called
    Then the transaction is stored in the store`, async () => {
    // Arrange
    const transaction = TRANSACTION_MOCK;

    // Act
    await repository.addTransaction(transaction);

    // Assert
    expect(transactionsStore.allTransactions()).toContain(transaction);
  });
});
