import { Attachment, EmailAddress } from "../../../domain/object-values";

export interface SendEmailInput {
  to: EmailAddress | EmailAddress[];
  subject: string;

  htmlBody?: string;
  textBody?: string;

  cc?: EmailAddress[];
  bcc?: EmailAddress[];
  replyTo?: EmailAddress;

  headers?: Record<string, string>;
  attachments?: Attachment[];

  templateId?: string;
  templateData?: Record<string, unknown>;
}
