import { FUND_CATEGORIES } from '@funds/core/constants';

export const GET_FUNDS_MOCK = {
  code: 200,
  message: 'SUCCESS',
  data: [
    {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmmount: 75000,
      category: FUND_CATEGORIES.FIC,
    },
    {
      id: 2,
      name: 'FPV_BTG_PACTUAL_ECOPETROL',
      minAmmount: 125000,
      category: FUND_CATEGORIES.FPV,
    },
    {
      id: 3,
      name: 'DEUDAPRIVADA',
      minAmmount: 50000,
      category: FUND_CATEGORIES.FIC,
    },
    {
      id: 4,
      name: 'FDO-ACCIONES',
      minAmmount: 250000,
      category: FUND_CATEGORIES.FIC,
    },
    {
      id: 5,
      name: 'FPV_BTG_PACTUAL_DINAMICA',
      minAmmount: 100000,
      category: FUND_CATEGORIES.FPV,
    },
  ],
};
