import { FundsRepository } from '@funds/core/repositories/funds.repository';
import { FundsImplementationRepository } from '@funds/data/repositories/funds/funds-implementation.repository';

export const serviceProvider = [
  {
    provide: FundsRepository,
    useClass: FundsImplementationRepository,
  },
];
