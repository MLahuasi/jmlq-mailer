import { InvalidEmailError } from "../errors";
import { Attachment, EmailAddress } from "../object-values";
import { EmailPayload } from "../types";

export class Email {
  private readonly to: Array<EmailAddress>;
  private readonly subject: string;
  private readonly htmlBody?: string;
  private readonly textBody?: string;
  private readonly cc: Array<EmailAddress> | undefined;
  private readonly bcc: Array<EmailAddress> | undefined;
  private readonly replyTo?: EmailAddress;
  private readonly headers?: Record<string, string>;
  private readonly attachments?: Array<Attachment>;

  private constructor(props: EmailPayload) {
    // this.to = props.to;
    this.to = Array.isArray(props.to) ? props.to : [props.to];
    this.subject = props.subject;
    this.htmlBody = props.htmlBody;
    this.textBody = props.textBody;
    this.cc = props.cc;
    this.bcc = props.bcc;
    this.replyTo = props.replyTo;
    this.headers = props.headers;
    this.attachments = props.attachments;
  }

  public static create(props: EmailPayload): Email {
    if (!props) {
      throw new InvalidEmailError("Email props cannot be null or undefined");
    }

    const to = Array.isArray(props.to) ? props.to : [props.to];

    if (to.length === 0) {
      throw new InvalidEmailError(
        "Email must have at least one recipient (to)"
      );
    }

    if (!props.to) {
      throw new InvalidEmailError(
        "Email must have at least one recipient (to)"
      );
    }

    const subject = String(props.subject || "").trim();
    if (!subject) {
      throw new InvalidEmailError("Email subject is required");
    }

    const hasHtmlBody = !!props.htmlBody && props.htmlBody.trim().length > 0;
    const hasTextBody = !!props.textBody && props.textBody.trim().length > 0;

    if (!hasHtmlBody && !hasTextBody) {
      throw new InvalidEmailError(
        "Email must have at least one body: htmlBody or textBody"
      );
    }

    return new Email({
      to: props.to,
      subject,
      htmlBody: props.htmlBody,
      textBody: props.textBody,
      cc: props.cc,
      bcc: props.bcc,
      replyTo: props.replyTo,
      headers: props.headers,
      attachments: props.attachments,
    });
  }

  // Getters (no exponemos estructura interna mutable)
  public getTo(): ReadonlyArray<EmailAddress> {
    return [...this.to]; // copia defensiva
  }

  public getSubject(): string {
    return this.subject;
  }

  public getHtmlBody(): string | undefined {
    return this.htmlBody;
  }

  public getTextBody(): string | undefined {
    return this.textBody;
  }

  public getCc(): ReadonlyArray<EmailAddress> | undefined {
    return this.cc ? [...this.cc] : undefined;
  }

  public getBcc(): ReadonlyArray<EmailAddress> | undefined {
    return this.bcc ? [...this.bcc] : undefined;
  }

  public getReplyTo(): EmailAddress | undefined {
    return this.replyTo;
  }

  public getHeaders(): Readonly<Record<string, string>> | undefined {
    return this.headers ? { ...this.headers } : undefined;
  }

  public getAttachments(): ReadonlyArray<Attachment> | undefined {
    return this.attachments ? [...this.attachments] : undefined;
  }
}
