import { BUTTONS } from '@shared/constants';

export type ButtonTypes = (typeof BUTTONS)[keyof typeof BUTTONS];
