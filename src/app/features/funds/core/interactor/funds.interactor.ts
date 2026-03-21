import { inject, Injectable } from '@angular/core';
import { GetFundsUseCase, SubscribeFundUseCase } from '@funds/core/usecases';
import { FundEntity } from '../entities';

@Injectable()
export class FundsInteractor {
  private readonly getFundsUseCase = inject(GetFundsUseCase);
  private readonly subscribeFundUseCase = inject(SubscribeFundUseCase);

  public getFunds(): Promise<FundEntity[]> {
    return this.getFundsUseCase.execute();
  }

  public subscribeFunds(id: string): Promise<void> {
    return this.subscribeFundUseCase.execute(id);
  }
}
