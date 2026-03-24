import { TransactionEntity } from '../entities';

export abstract class TransactionsRepository {
  public abstract getTransactions(): Promise<TransactionEntity[]>;
  public abstract addTransaction(transaction: TransactionEntity): Promise<void>;
}
