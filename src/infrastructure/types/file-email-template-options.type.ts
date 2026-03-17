export type FileEmailTemplateOptions = {
  /**
   * Directorio base ABSOLUTO donde están los templates.
   * Ej: resolve(process.cwd(), "dist/templates")
   */
  templatesPath: string;

  /**
   * Extensión de los templates, sin punto.
   * Default: "html"
   */
  extension?: string;
};
