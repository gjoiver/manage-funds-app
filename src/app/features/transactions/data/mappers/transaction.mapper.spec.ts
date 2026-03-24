import { TransactionsMapper } from './transaction.mapper';
import { TRANSACTIONS_MOCK, TRANSACTION_MOCK } from '@transactions/data/mocks/transaction.mock';
import { TRANSACTION_TYPE_LABELS } from '@transactions/core/entities';
import { NOTIFICATION_METHOD_LABELS } from '@shared/entities';

describe(`TransactionsMapper`, () => {
  it(`Given a list of transactions with notification methods
    When from is called
    Then adds the typeLabel to each transaction`, () => {
    // Arrange
    const transactions = TRANSACTIONS_MOCK;

    // Act
    const result = TransactionsMapper.from(transactions);

    // Assert
    expect(result[0].typeLabel).toBe(TRANSACTION_TYPE_LABELS[TRANSACTION_MOCK.type]);
  });

  it(`Given a transaction with a notification method
    When from is called
    Then adds the notificationLabel to the transaction`, () => {
    // Arrange
    const transaction = { ...TRANSACTION_MOCK, notificationMethod: 'email' as const };

    // Act
    const result = TransactionsMapper.from([transaction]);

    // Assert
    expect(result[0].notificationLabel).toBe(NOTIFICATION_METHOD_LABELS.email);
  });

  it(`Given a transaction without a notification method
    When from is called
    Then sets notificationLabel to N/A`, () => {
    // Arrange
    const transaction = { ...TRANSACTION_MOCK, notificationMethod: undefined };

    // Act
    const result = TransactionsMapper.from([transaction]);

    // Assert
    expect(result[0].notificationLabel).toBe('N/A');
  });

  it(`Given a list of transactions
    When from is called
    Then preserves all original transaction fields`, () => {
    // Arrange
    const transactions = [TRANSACTION_MOCK];

    // Act
    const result = TransactionsMapper.from(transactions);

    // Assert
    expect(result[0].id).toBe(TRANSACTION_MOCK.id);
    expect(result[0].fundId).toBe(TRANSACTION_MOCK.fundId);
    expect(result[0].amount).toBe(TRANSACTION_MOCK.amount);
  });

  it(`Given an empty list
    When from is called
    Then returns an empty array`, () => {
    // Arrange
    const transactions: [] = [];

    // Act
    const result = TransactionsMapper.from(transactions);

    // Assert
    expect(result).toEqual([]);
  });
});
