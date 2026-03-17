import { createTransport, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Email, InvalidSendResultError } from "../../../domain";
import { formatMailAddress } from "./node-mailer.mappers";

import { IMailerClient, SendResult } from "../../../application/types";
import { NodemailerServiceError } from "../../error";

export class NodemailerService implements IMailerClient {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly from?: string;

  constructor(config: SMTPTransport.Options & { from?: string }) {
    this.transporter = createTransport(config);
    this.from =
      config.from ?? (config.auth && (config.auth as any).user) ?? undefined;
  }

  async send(email: Email): Promise<SendResult> {
    try {
      const cc = email.getCc();
      const bcc = email.getBcc();

      const result = await this.transporter.sendMail({
        from: this.from,
        to: formatMailAddress(email.getTo() && [...email.getTo()]),
        cc: formatMailAddress(cc ? [...cc] : undefined),
        bcc: formatMailAddress(bcc ? [...bcc] : undefined),
        replyTo: formatMailAddress(email.getReplyTo()),
        subject: email.getSubject(),
        html: email.getHtmlBody(),
        text: email.getTextBody(),
        headers: email.getHeaders(),
        attachments: this.mapAttachments(email),
      });

      return this.mapSendResult(result);
    } catch (error: unknown) {
      if (error instanceof NodemailerServiceError) throw error;

      const message =
        error instanceof Error
          ? `NodemailerService failed: ${error.message}`
          : "NodemailerService failed: unknown error";

      throw new NodemailerServiceError(message);
    }
  }

  /**
   * Mapea los attachments de la entidad de dominio a lo que Nodemailer espera.
   */
  private mapAttachments(email: Email) {
    const attachments = email.getAttachments();
    if (!attachments) return undefined;

    return attachments.map((a) => ({
      filename: a.getFilename(),
      path: a.getPath(),
      content: a.getContent(),
      contentType: a.getContentType(),
      cid: a.getCid(),
    }));
  }

  /**
   * Normaliza la respuesta de Nodemailer a SendResult
   * y valida que tenga un identificador válido.
   */
  private mapSendResult(result: unknown): SendResult {
    const anyRes = result as any;
    const messageId = anyRes?.messageId ?? anyRes?.id;

    if (!messageId || typeof messageId !== "string") {
      throw new InvalidSendResultError(
        "Nodemailer did not return a valid messageId or id"
      );
    }

    return { messageId };
  }
}
