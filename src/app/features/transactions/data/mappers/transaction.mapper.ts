import { Mapper } from '@shared/entities';
import { TRANSACTION_TYPE_LABELS, TransactionEntity } from '@transactions/core/entities';
import { NOTIFICATION_METHOD_LABELS } from '@shared/entities';

export class TransactionsMapper extends Mapper<TransactionEntity[], TransactionEntity[]> {
  public map(transactions: TransactionEntity[]): TransactionEntity[] {
    return TransactionsMapper.from(transactions);
  }

  public static from(transactions: TransactionEntity[]): TransactionEntity[] {
    return transactions.map((transaction) => ({
      ...transaction,
      typeLabel: TRANSACTION_TYPE_LABELS[transaction.type],
      notificationLabel: transaction.notificationMethod
        ? NOTIFICATION_METHOD_LABELS[transaction.notificationMethod]
        : 'N/A',
    }));
  }
}
