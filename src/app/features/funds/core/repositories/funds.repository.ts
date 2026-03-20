import { FundEntity } from '../entities';

export abstract class FundsRepository {
  public abstract getFunds(): Promise<FundEntity[]>;
  public abstract subscribeFund(id: string): Promise<void>;
}
