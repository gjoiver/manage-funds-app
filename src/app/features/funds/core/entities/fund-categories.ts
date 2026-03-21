import { FUND_CATEGORIES } from '../constants';

export type FundCategory = (typeof FUND_CATEGORIES)[keyof typeof FUND_CATEGORIES];
