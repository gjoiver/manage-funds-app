import { inject, Injectable } from '@angular/core';
import { FundsRepository } from '../../repositories/funds.repository';
import { FundEntity } from '../../entities';

@Injectable()
export class GetFundsUseCase {
  private readonly fundsRepository = inject(FundsRepository);

  public execute(): Promise<FundEntity[]> {
    return this.fundsRepository.getFunds();
  }
}
