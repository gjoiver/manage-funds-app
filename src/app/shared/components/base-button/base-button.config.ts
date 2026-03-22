import { BUTTONS } from '@shared/constants';
import { ButtonEntity } from '@shared/entities';

export const BaseButtonConfig = Object.freeze({
  baseClasses:
    'cursor-pointer px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors focus:outline-none focus:ring-2',

  buttonStyles: {
    [BUTTONS.Primary]:
      'text-white bg-brand-primary hover:opacity-90 focus:ring-brand-primary shadow-sm',
    [BUTTONS.Secondary]:
      'text-brand-secondary bg-transparent hover:bg-brand-surface focus:ring-brand-border',
    [BUTTONS.Danger]:
      'text-white bg-brand-danger hover:opacity-90 focus:ring-brand-danger shadow-sm',
  } as Record<ButtonEntity, string>,
});
