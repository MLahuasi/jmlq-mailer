import { SendEmailUseCase } from "../use-cases";

import { EmailService } from "../services";

import { Mailer } from "../public";
import { IMailerFactoryConfig } from "../types";

export function createMailer(config: IMailerFactoryConfig): Mailer {
  const emailService = new EmailService(config.mailer, config.templateRenderer);

  // Fachada pública: delega al service (o directo al use case, como prefieras)
  return {
    send: (input) => emailService.sendEmail(input),
    sendBatch: (input) => emailService.sendBatchEmail(input),
  };
}
