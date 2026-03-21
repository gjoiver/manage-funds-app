import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'fondos',
    pathMatch: 'full',
  },
  {
    path: 'fondos',
    loadChildren: () =>
      import('./features/funds/presentation/funds.routes').then((m) => m.FUNDS_ROUTES),
  },
];
