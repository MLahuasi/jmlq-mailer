# @jmlq/mailer 🧩

## 🎯 Objetivo

`@jmlq/mailer` es un paquete diseñado para enviar correos electrónicos siguiendo principios de **Clean Architecture**.

El paquete abstrae el envío de correos mediante un **puerto (`IMailerClient`)**, permitiendo cambiar el proveedor de envío sin afectar la lógica de la aplicación.

Actualmente el paquete incluye soporte para **Nodemailer**, aunque puede integrarse con cualquier proveedor externo implementando el puerto correspondiente.

---

## ⭐ Importancia

En aplicaciones modernas el envío de correos es un componente transversal utilizado para:

- recuperación de contraseña
- verificación de cuentas
- notificaciones
- alertas internas

Este paquete permite:

- desacoplar la lógica de negocio del proveedor de correo
- soportar plantillas HTML
- soportar envío batch
- mantener una arquitectura limpia

---

## 🏗️ Arquitectura (visión rápida)

```
Application
 ├── SendEmailUseCase
 ├── EmailService
 └── Mailer facade

Domain
 └── Email entity

Infrastructure
 └── NodemailerService
```

➡️ Ver detalle en: [`architecture.md`](./docs/es/architecture.md)

---

# 🔧 Implementación

## 5.1 Instalación

```
npm i @jmlq/mailer
```

---

## 5.2 Dependencias

El paquete utiliza:

- nodemailer
- typescript

---

## 5.3 Quickstart

```ts
import { createMailer } from "@jmlq/mailer";
import { NodemailerService } from "@jmlq/mailer/infrastructure";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET_KEY,
  },
});

const mailerClient = new NodemailerService(transporter);

const mailer = createMailer({
  mailer: mailerClient,
});

await mailer.send({
  to: "user@example.com",
  subject: "Welcome",
  htmlBody: "<h1>Hello</h1>",
});
```

---

## 5.4 Variables de entorno

Ejemplo basado en el API REST:

```
MAIL_DRIVER=nodemailer
MAILER_SERVICE=gmail
MAILER_EMAIL=example@gmail.com
MAILER_SECRET_KEY=secret
MAILER_FROM=example@gmail.com
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_TEMPLATE_PATH=/dist/templates/
MAIL_TEMPLATE_EXTENSION=html
```

---

## 5.5 Helpers y funcionalidades clave

El paquete soporta:

- templates de correo
- attachments
- cc / bcc
- envío batch
- integración con proveedores externos

---

## ✅ Checklist

- [Instalar paquete](#51-instalación)
- [Configurar proveedor de correo](./docs/es/configuration.md#configuración--jmlqmailer-️)
- [Crear instancia de mailer](./docs/es/configuration.md#crear-instancia-del-mailer)
- [Integrar en la aplicación](./docs/es/integration-express.md)

---

## 📌 Menú

- [Arquitectura](./docs/es/architecture.md)
- [Configuración](./docs/es/configuration.md)
- [Integración Express](./docs/es/integration-express.md)
- [Troubleshooting](./docs/es/troubleshooting.md)

## ⬅️ 🌐 Ecosistema

- [`@jmlq`](https://github.com/MLahuasi/jmlq-ecosystem#readme)
