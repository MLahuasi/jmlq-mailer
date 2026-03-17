import { InvalidAttachmentError } from "../errors";
import { AttachmentPayload } from "../types";

export class Attachment {
  private readonly filename: string;
  private readonly path?: string;
  private readonly content?: string | Buffer;
  private readonly contentType?: string;
  private readonly cid?: string;

  private constructor(props: AttachmentPayload) {
    this.filename = props.filename;
    this.path = props.path;
    this.content = props.content;
    this.contentType = props.contentType;
    this.cid = props.cid;
  }

  public static create(props: AttachmentPayload): Attachment {
    if (!props) {
      throw new InvalidAttachmentError(
        "Attachment props cannot be null or undefined"
      );
    }

    const filename = String(props.filename || "").trim();
    if (!filename) {
      throw new InvalidAttachmentError("Attachment filename is required");
    }

    const hasPath = !!props.path;
    const hasContent = props.content !== undefined;

    if (!hasPath && !hasContent) {
      throw new InvalidAttachmentError(
        "Attachment must have either a path or content"
      );
    }

    return new Attachment({
      filename,
      path: props.path,
      content: props.content,
      contentType: props.contentType,
      cid: props.cid,
    });
  }

  public getFilename(): string {
    return this.filename;
  }

  public getPath(): string | undefined {
    return this.path;
  }

  public getContent(): string | Buffer | undefined {
    return this.content;
  }

  public getContentType(): string | undefined {
    return this.contentType;
  }

  public getCid(): string | undefined {
    return this.cid;
  }
}
