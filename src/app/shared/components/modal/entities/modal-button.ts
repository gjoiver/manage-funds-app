import { ButtonTypes } from '@shared/entities';

export interface ModalButton {
  text: string;
  style?: ButtonTypes;
  action?: () => void;
}
