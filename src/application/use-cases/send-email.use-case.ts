// src/application/use-cases/send-email.usecase.ts

import { Email } from "../../domain/entities";
import { EmailTemplate, IMailerClient } from "../types";
import { SendEmailInput } from "../types/input";
import { SendResult, SendResultBatch } from "../types/out";

/**
 * SendEmailUseCase
 *
 * - Caso de uso único para:
 *   - envío simple (send)
 *   - envío batch (sendBatch)
 *   - soporte de templates (vía templateId/templateData) SIN método extra
 *
 * Clean rules:
 * - Domain valida invariantes (Email.create)
 * - Application resuelve template (si aplica) y orquesta
 * - Infrastructure solo implementa IMailerClient y EmailTemplate
 */
export class SendEmailUseCase {
  constructor(
    private readonly mailer: IMailerClient,
    private readonly templateRenderer?: EmailTemplate
  ) {}

  // ---------------------------------------------------------------------------
  // Overloads: mejor DX al consumir
  // ---------------------------------------------------------------------------
  public async execute(input: SendEmailInput): Promise<SendResult>;
  public async execute(input: SendEmailInput[]): Promise<SendResultBatch>;

  public async execute(
    input: SendEmailInput | SendEmailInput[]
  ): Promise<SendResult | SendResultBatch> {
    return Array.isArray(input) ? this.sendBatch(input) : this.sendOne(input);
  }

  // ---------------------------------------------------------------------------
  // Internals
  // ---------------------------------------------------------------------------

  private async sendOne(item: SendEmailInput): Promise<SendResult> {
    const { htmlBody, textBody } = await this.resolveBodies(item);

    // Domain: invariantes y validaciones fuertes aquí
    const email = Email.create({
      to: item.to,
      subject: item.subject,
      htmlBody,
      textBody,
      cc: item.cc,
      bcc: item.bcc,
      replyTo: item.replyTo,
      headers: item.headers,
      attachments: item.attachments,
    });

    return this.mailer.send(email);
  }

  private async sendBatch(items: SendEmailInput[]): Promise<SendResultBatch> {
    const results: SendResultBatch["results"] = [];

    for (const item of items) {
      try {
        const { htmlBody, textBody } = await this.resolveBodies(item);

        const email = Email.create({
          to: item.to,
          subject: item.subject,
          htmlBody,
          textBody,
          cc: item.cc,
          bcc: item.bcc,
          replyTo: item.replyTo,
          headers: item.headers,
          attachments: item.attachments,
        });

        const result = await this.mailer.send(email);
        results.push({ input: item, email, result });
      } catch (error) {
        results.push({ input: item, error: this.asError(error) });
      }
    }

    const successCount = results.filter((r) => "result" in r).length;
    const failureCount = results.length - successCount;

    return { results, successCount, failureCount };
  }

  /**
   * Resuelve htmlBody/textBody considerando template opcional.
   * - Si hay templateId => requiere templateRenderer
   * - Si no, usa bodies provistos en el input.
   */
  private async resolveBodies(item: SendEmailInput): Promise<{
    htmlBody?: string;
    textBody?: string;
  }> {
    let htmlBody = item.htmlBody;
    const textBody = item.textBody;

    if (item.templateId) {
      if (!this.templateRenderer) {
        throw new Error(
          `[mailer] templateId="${item.templateId}" fue provisto pero no hay templateRenderer configurado`
        );
      }

      htmlBody = await this.templateRenderer.render(
        item.templateId,
        item.templateData ?? {}
      );
    }

    return { htmlBody, textBody };
  }

  private asError(err: unknown): Error {
    return err instanceof Error ? err : new Error(String(err));
  }
}
