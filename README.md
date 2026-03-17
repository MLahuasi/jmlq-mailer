# @jmlq/mailer 🧩

## 🎯 Objective

`@jmlq/mailer` is a package designed to send emails following **Clean Architecture principles**.

The package abstracts email sending through a **port (`IMailerClient`)**, allowing the email provider to be changed without affecting application logic.

Currently, the package includes support for **Nodemailer**, but it can be integrated with any external provider by implementing the corresponding port.

---

## ⭐ Importance

In modern applications, email sending is a cross-cutting concern used for:

- password recovery
- account verification
- notifications
- internal alerts

This package allows:

- decoupling business logic from the email provider
- supporting HTML templates
- supporting batch sending
- maintaining a clean architecture

---

## 🏗️ Architecture (quick view)

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

➡️ See details: [`architecture.md`](./docs/en/architecture.md)

---

# 🔧 Implementation

## 5.1 Installation

```id="y7p3ka"
npm i @jmlq/mailer
```

---

## 5.2 Dependencies

The package uses:

- nodemailer
- typescript

---

## 5.3 Quickstart

```ts id="n3k8zt"
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

## 5.4 Environment variables

Example based on the REST API:

```id="k1v9rm"
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

## 5.5 Helpers and key features

The package supports:

- email templates
- attachments
- cc / bcc
- batch sending
- integration with external providers

---

## ✅ Checklist

- [Install package](#51-installation)
- [Configure email provider](./docs/en/configuration.md#configuration--jmlqmailer-️)
- [Create mailer instance](./docs/en/configuration.md#crear-instancia-del-mailer)
- [Integrate into the application](./docs/en/integration-express.md)

---

## 📌 Menu

- [Architecture](./docs/en/architecture.md)
- [Configuration](./docs/en/configuration.md)
- [Express Integration](./docs/en/integration-express.md)
- [Troubleshooting](./docs/en/troubleshooting.md)

## ⬅️ 🌐 Ecosystem

- [`@jmlq`](https://github.com/MLahuasi/jmlq-ecosystem#readme)
