import { ModalButton } from './modal-button';

export interface ModalEntity {
  title: string;
  message: string;
  buttons: ModalButton[];
}
