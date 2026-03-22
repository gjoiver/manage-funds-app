import { inject, Injectable } from '@angular/core';
import { FundsRepository } from '../../repositories/funds.repository';

@Injectable()
export class UnsubscribeFundUseCase {
  private readonly fundsRepository = inject(FundsRepository);

  public execute(id: number): Promise<void> {
    return this.fundsRepository.unsubscribeFund(id);
  }
}
