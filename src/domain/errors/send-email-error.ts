export type SendEmailErrorCode =
  | "INVALID_EMAIL"
  | "PROVIDER_UNAVAILABLE"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "UNKNOWN";

export interface ISendEmailError {
  code: SendEmailErrorCode;
  message: string;
  cause?: unknown;
}
