import { inject, Injectable } from '@angular/core';
import {
  GetFundsUseCase,
  SubscribeFundUseCase,
  UnsubscribeFundUseCase,
} from '@funds/core/usecases';
import { FundEntity } from '../entities';

@Injectable()
export class FundsInteractor {
  private readonly getFundsUseCase = inject(GetFundsUseCase);
  private readonly subscribeFundUseCase = inject(SubscribeFundUseCase);
  private readonly unsubscribeFundUseCase = inject(UnsubscribeFundUseCase);

  public getFunds(): Promise<FundEntity[]> {
    return this.getFundsUseCase.execute();
  }

  public subscribeFund(id: number): Promise<void> {
    return this.subscribeFundUseCase.execute(id);
  }

  public unsubscribeFund(id: number): Promise<void> {
    return this.unsubscribeFundUseCase.execute(id);
  }
}
