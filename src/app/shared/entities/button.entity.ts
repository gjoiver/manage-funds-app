import { BUTTONS } from '@shared/constants';

export type ButtonEntity = (typeof BUTTONS)[keyof typeof BUTTONS];
