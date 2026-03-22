export const TRANSACTION_TYPES = {
  Subscription: 'subscription',
  Unsubscription: 'unsubscription',
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
