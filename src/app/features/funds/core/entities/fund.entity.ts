import { ResponseEntity } from '@shared/entities';
import { FundCategory } from './fund-categories';

export interface FundEntity {
  id: number;
  name: string;
  minAmount: number;
  category: FundCategory;
}

export interface FundsResponse extends ResponseEntity<FundEntity[]> {}
