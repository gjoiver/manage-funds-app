import { ResponseEntity } from '@shared/entities';
import { FundCategory } from './fund-categories';

export interface FundEntity {
  id: string;
  name: string;
  minAmmount: number;
  category: FundCategory;
}

export interface FundsResponse extends ResponseEntity<FundEntity[]> {}
