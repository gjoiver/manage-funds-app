export interface ResponseEntity<T = unknown> {
  code: string;
  message: string;
  data: T;
}