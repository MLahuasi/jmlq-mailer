import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { EmailTemplate } from "../../application/types";
import { FileEmailTemplateOptions } from "../types";

/**
 * EmailTemplate oficial de @jmlq/mailer que renderiza templates desde archivos.
 *
 * - Busca <templatesDirAbs>/<templateName>.<extension>
 * - Interpola {{key}} usando data[key]
 * - Sin dependencias externas
 * - Compatible con targets antiguos (sin replaceAll)
 */
export class FileEmailTemplate implements EmailTemplate {
  private readonly templatesPath: string;
  private readonly extension: string;

  constructor(opts: FileEmailTemplateOptions) {
    if (!opts?.templatesPath || !opts.templatesPath.trim()) {
      throw new Error(`[mailer] FileEmailTemplate requires templatesDirAbs`);
    }
    this.templatesPath = opts.templatesPath;
    this.extension = (opts.extension ?? "html").trim() || "html";
  }

  async render(
    templateName: string,
    data: Record<string, unknown>
  ): Promise<string> {
    const name = String(templateName || "").trim();
    if (!name) {
      throw new Error("[mailer] templateName is required");
    }

    const filePath = resolve(this.templatesPath, `${name}.${this.extension}`);

    let html: string;
    try {
      html = readFileSync(filePath, "utf-8");
    } catch {
      throw new Error(`[mailer] No se pudo leer template: ${filePath}`);
    }

    // Interpolación simple: {{key}}
    for (const key in data) {
      const value = String(data[key]);
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      html = html.replace(pattern, value);
    }

    return html;
  }
}
