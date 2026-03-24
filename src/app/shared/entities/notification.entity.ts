import { NOTIFICATIONS_TYPES } from '@shared/constants';

export type NotificationEntity = (typeof NOTIFICATIONS_TYPES)[keyof typeof NOTIFICATIONS_TYPES];

export const NOTIFICATION_METHOD_LABELS: Record<NonNullable<NotificationEntity>, string> = {
  [NOTIFICATIONS_TYPES.Email]: 'Email',
  [NOTIFICATIONS_TYPES.Sms]: 'SMS',
};
