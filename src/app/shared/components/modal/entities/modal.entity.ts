import { DynamicComponentCell } from '@shared/entities';
import { ModalButton } from './modal-button';

export interface ModalEntity {
  title: string;
  message?: string;
  buttons: ModalButton[];
  contentComponent?: DynamicComponentCell;
}
