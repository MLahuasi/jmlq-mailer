export interface AttachmentPayload {
  filename: string;
  path?: string;
  content?: string | Buffer;
  contentType?: string;
  cid?: string; // inline images
}
