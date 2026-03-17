import { Email } from "../../../domain/entities";
import { SendResult } from ".";
import { SendEmailInput } from "../input";

export type SendResultBatchItem =
  | { input: SendEmailInput; email: Email; result: SendResult; error?: never }
  | { input: SendEmailInput; email?: Email; error: Error; result?: never };

export interface SendResultBatch {
  results: SendResultBatchItem[];
  successCount: number;
  failureCount: number;
}
