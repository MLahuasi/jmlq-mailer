import type SMTPTransport from "nodemailer/lib/smtp-transport";
export type NodemailerConfig = SMTPTransport.Options & { from?: string };
