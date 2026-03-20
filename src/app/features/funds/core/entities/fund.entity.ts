import { ResponseEntity } from '@shared/entities';
import { FundTypes } from './fund.types';

export interface FundEntity {
  id: string;
  name: string;
  minAmmount: number;
  category: FundTypes;
}

export interface FundsResponse extends ResponseEntity<FundEntity[]> {}
