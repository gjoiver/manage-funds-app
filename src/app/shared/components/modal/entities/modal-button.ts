import { ButtonEntity } from '@shared/entities';

export interface ModalButton {
  text: string;
  style?: ButtonEntity;
  action?: () => void;
}
