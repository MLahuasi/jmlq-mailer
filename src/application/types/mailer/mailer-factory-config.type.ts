import { EmailTemplate, IMailerClient } from "..";

export interface IMailerFactoryConfig {
  mailer: IMailerClient;
  templateRenderer?: EmailTemplate;
}
