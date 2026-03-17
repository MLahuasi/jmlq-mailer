/**
 * IEmailTemplateRenderer
 *
 * Port de dominio para un motor de plantillas de email.
 * Su responsabilidad es tomar un nombre de plantilla + datos
 * y devolver el HTML renderizado.
 *
 * Implementaciones típicas (en infraestructura):
 *  - Handlebars
 *  - EJS
 *  - Nunjucks
 *  - Motores custom
 */
export interface EmailTemplate {
  /**
   * Renderiza una plantilla de email con los datos proporcionados.
   *
   * @param templateName Nombre lógico o identificador de la plantilla.
   *                     Por ejemplo: "welcome-email", "reset-password".
   * @param data         Objeto de datos usado para interpolar variables en la plantilla.
   * @returns            HTML resultante de la renderización.
   */
  render(templateName: string, data: Record<string, unknown>): Promise<string>;
}
