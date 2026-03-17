import { InvalidMailAddressError } from "../errors";
import { EmailContact } from "../types/email";

export class EmailAddress {
  private readonly email: string;
  private readonly name?: string;

  private constructor(props: EmailContact) {
    this.email = props.email;
    this.name = props.name;
  }

  public static from(value: string | EmailContact): EmailAddress {
    if (!value) {
      throw new InvalidMailAddressError(
        "Mail address cannot be null or undefined"
      );
    }

    if (typeof value === "string") {
      const email = value.trim();
      if (!email) {
        throw new InvalidMailAddressError("Mail address cannot be empty");
      }
      if (!EmailAddress.isValidEmail(email)) {
        throw new InvalidMailAddressError(`Invalid email format: ${email}`);
      }

      return new EmailAddress({ email });
    }

    const email = String(value.email || "").trim();
    if (!email) {
      throw new InvalidMailAddressError("Email is required");
    }
    if (!EmailAddress.isValidEmail(email)) {
      throw new InvalidMailAddressError(`Invalid email format: ${email}`);
    }

    const name = value.name?.trim() || undefined;

    return new EmailAddress({ email, name });
  }

  private static isValidEmail(email: string): boolean {
    // Validación simple, sin sobreingeniería.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string | undefined {
    return this.name;
  }

  public toString(): string {
    return this.name ? `${this.name} <${this.email}>` : this.email;
  }
}
