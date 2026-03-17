import { Attachment, EmailAddress } from "../../object-values";

export interface EmailPayload {
  to: EmailAddress | Array<EmailAddress>;
  subject: string;
  htmlBody?: string;
  textBody?: string;
  cc?: Array<EmailAddress>;
  bcc?: Array<EmailAddress>;
  replyTo?: EmailAddress;
  headers?: Record<string, string>;
  attachments?: Array<Attachment>;
}
