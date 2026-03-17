import { SendEmailInput } from "../types/input";
import { SendResult, SendResultBatch } from "../types/out";

export interface Mailer {
  send(input: SendEmailInput): Promise<SendResult>;
  sendBatch(inputs: SendEmailInput[]): Promise<SendResultBatch>;

  // opcional (alias)
  // sendTemplated?(input: SendEmailInput): Promise<SendResult>;
}
