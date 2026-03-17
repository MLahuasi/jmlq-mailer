export class InvalidMailAddressError extends Error {
  constructor(message = "Invalid mail address") {
    super(message);
    this.name = "InvalidMailAddressError";
  }
}

export class InvalidAttachmentError extends Error {
  constructor(message = "Invalid attachment") {
    super(message);
    this.name = "InvalidAttachmentError";
  }
}

export class InvalidEmailError extends Error {
  constructor(message = "Invalid email entity") {
    super(message);
    this.name = "InvalidEmailError";
  }
}

export class InvalidSendResultError extends Error {
  constructor(message = "Invalid send result") {
    super(message);
    this.name = "InvalidSendResultError";
  }
}
