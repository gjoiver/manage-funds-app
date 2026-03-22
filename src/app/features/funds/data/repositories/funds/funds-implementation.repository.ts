import { Injectable } from '@angular/core';
import { FundEntity } from '@funds/core/entities';
import { FundsRepository } from '@funds/core/repositories/funds.repository';
import { GET_FUNDS_MOCK } from '@funds/data/mocks';
import { delay, lastValueFrom, of } from 'rxjs';

@Injectable()
export class FundsImplementationRepository implements FundsRepository {
  public getFunds(): Promise<FundEntity[]> {
    return lastValueFrom(of(GET_FUNDS_MOCK.data).pipe(delay(1500)));
  }

  public subscribeFund(_id: number): Promise<void> {
    return lastValueFrom(of(undefined).pipe(delay(1500)));
  }

  public unsubscribeFund(id: number): Promise<void> {
    return lastValueFrom(of(undefined).pipe(delay(1500)));
  }
}
