import { Email } from "../../../domain/entities";
import { SendResult } from "../out";

// Puerto de abstracción para el servicio de envío de correos.
// Define el contrato que cualquier implementación de servicio de correo debe cumplir.
export interface IMailerClient {
  send(msg: Email): Promise<SendResult>;
}
