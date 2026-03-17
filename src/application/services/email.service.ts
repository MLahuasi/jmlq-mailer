import { SendEmailUseCase } from "../use-cases";
import { SendResult, SendResultBatch } from "../types/out";
import { SendEmailInput } from "../types/input";
import { EmailTemplate } from "../types/email";
import { IMailerClient } from "../types/mailer";

export class EmailService {
  private readonly sendEmailUseCase: SendEmailUseCase;

  constructor(mailer: IMailerClient, templateRenderer?: EmailTemplate) {
    this.sendEmailUseCase = new SendEmailUseCase(mailer, templateRenderer);
  }

  async sendEmail(input: SendEmailInput): Promise<SendResult> {
    return this.sendEmailUseCase.execute(input);
  }

  async sendBatchEmail(inputs: SendEmailInput[]): Promise<SendResultBatch> {
    return this.sendEmailUseCase.execute(inputs);
  }
}
