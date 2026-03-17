export class NodemailerServiceError extends Error {
  constructor(message = "Nodemailer service error") {
    super(message);
    this.name = "NodemailerServiceError";
  }
}
