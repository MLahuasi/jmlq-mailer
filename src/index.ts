// Factory + facade
export { createMailer } from "./application/factories";
export { IMailerFactoryConfig, EmailTemplate } from "./application/types";
export type { Mailer } from "./application/public";

// Infra listo para usar
export { NodemailerService } from "./infrastructure/services/nodemailer";
export { FileEmailTemplate } from "./infrastructure/templates";
export { FileEmailTemplateOptions } from "./infrastructure/types";

// Domain building blocks (necesarios para construir emails)
export { Email } from "./domain/entities";
export { EmailAddress, Attachment } from "./domain/object-values";

// Errores (opcional pero útil)
export * from "./domain/errors";
