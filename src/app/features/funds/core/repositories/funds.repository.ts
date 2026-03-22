import { FundEntity } from '../entities';

export abstract class FundsRepository {
  public abstract getFunds(): Promise<FundEntity[]>;
  public abstract subscribeFund(id: number): Promise<void>;
  public abstract unsubscribeFund(id: number): Promise<void>;
}
