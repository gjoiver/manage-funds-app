import { inject } from '@angular/core';
import { FundsRepository } from '../repositories/funds.repository';

export class SubscribeFundUseCase {
  private readonly fundsRepository = inject(FundsRepository);

  public execute(id: string): Promise<void> {
    return this.fundsRepository.subscribeFund(id);
  }
}
