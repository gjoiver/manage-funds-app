import { FundEntity } from '@funds/core/entities';

import { HomePage } from './home.page';
import { ColumnDef } from '@shared/entities';
import { BaseButtonComponent } from '@shared/components';
import { BUTTONS } from '@shared/constants';

export const HomePageConfig = Object.freeze({
  i18n: {
    balanceTitle: 'Saldo total',
    availableFunds: 'Fondos disponibles',
    descriptionFunds: 'Explora y vincúlate a nuestros fondos de inversión.',
    modals: {
      notEnoughMoney: {
        title: '¡No tienes fondos suficientes!',
        message: 'No cuentas con el monto minimo para subscribirte a este fondo',
        buttons: [
          {
            text: 'Cerrar',
          },
        ],
      },
      unsubscribe: {
        title: 'Cancelar suscripción',
        message: '¿Estás seguro que deseas retirarte del fondo ',
        buttons: [
          { text: 'Volver', style: BUTTONS.Secondary },
          { text: 'Confirmar retiro', style: BUTTONS.Danger },
        ],
      },
      subscribe: {
        title: 'Suscribirse al fondo',
        message: '¿Cómo deseas recibir las notificaciones de ',
        buttons: [
          { text: 'Cancelar', style: BUTTONS.Secondary },
          {
            text: 'Confirmar',
            style: BUTTONS.Primary,
          },
        ],
      },
    },
    toast: {
      fundsError: 'Hubo un error al obtener los fondos. Intentalo más tarde por favor.',
      subscribe: {
        error: 'Hubo un error al subscribirse. Intentalo más tarde por favor.',
        success: 'Te has subscrito de manera exitosa al fondo',
      },
      unsubscribe: {
        error: 'Hubo un error al desubscribirse. Intentalo más tarde por favor.',
        success: 'Te has retirado exitosamente del fondo',
      },
    },
  },
});

export const TableConfig = (componentRef: HomePage): ColumnDef<FundEntity>[] => [
  { header: 'Fondo', key: 'name', type: 'text' },
  { header: 'Categoria', key: 'category', type: 'text' },
  { header: 'Monto minimo', key: 'minAmount', type: 'currency' },
  {
    header: 'Acción',
    key: 'action',
    type: 'custom',
    component: (row: FundEntity, _index: number) => ({
      class: BaseButtonComponent,
      inputs: {
        style: componentRef.hasSubscription(row) ? BUTTONS.Danger : BUTTONS.Primary,
        label: componentRef.hasSubscription(row) ? 'Cancelar' : 'Subscribirse',
        buttonClick: () => componentRef.handleSubscription(row),
      },
    }),
  },
];
