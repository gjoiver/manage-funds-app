import { FUND_CATEGORIES } from '@funds/core/constants';

export const GET_FUNDS_MOCK = {
  code: 200,
  message: 'SUCCESS',
  data: [
    {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmount: 75000,
      category: FUND_CATEGORIES.FIC,
    },
    {
      id: 2,
      name: 'FPV_BTG_PACTUAL_ECOPETROL',
      minAmount: 125000,
      category: FUND_CATEGORIES.FPV,
    },
    {
      id: 3,
      name: 'DEUDAPRIVADA',
      minAmount: 50000,
      category: FUND_CATEGORIES.FIC,
    },
    {
      id: 4,
      name: 'FDO-ACCIONES',
      minAmount: 250000,
      category: FUND_CATEGORIES.FIC,
    },
    {
      id: 5,
      name: 'FPV_BTG_PACTUAL_DINAMICA',
      minAmount: 100000,
      category: FUND_CATEGORIES.FPV,
    },
  ],
};
