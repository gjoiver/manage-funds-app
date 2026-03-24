import { FundsRepository } from '@funds/core/repositories/funds.repository';
import { GET_FUNDS_MOCK } from './get-funds-mock';
import { FundEntity } from '@funds/core/entities';

export class FundsRepositoryMock extends FundsRepository {
  public getFunds(): Promise<FundEntity[]> {
    return Promise.resolve(GET_FUNDS_MOCK.data);
  }
  public subscribeFund(): Promise<void> {
    return Promise.resolve(undefined);
  }
  public unsubscribeFund(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
