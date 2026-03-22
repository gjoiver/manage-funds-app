import { inject, Injectable } from '@angular/core';
import { FundsRepository } from '../../repositories/funds.repository';

@Injectable()
export class SubscribeFundUseCase {
  private readonly fundsRepository = inject(FundsRepository);

  public execute(id: number): Promise<void> {
    return this.fundsRepository.subscribeFund(id);
  }
}
