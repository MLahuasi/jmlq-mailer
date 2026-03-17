# Configuration — @jmlq/mailer ⚙️

## Basic configuration

The package requires an email provider that implements `IMailerClient`.

---

# Implementation with Nodemailer

```ts id="k2s8dj"
import nodemailer from "nodemailer";
import { NodemailerService } from "@jmlq/mailer/infrastructure";
```

---

## Create transporter

```ts id="p9x4lm"
const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET_KEY,
  },
});
```

---

## Create client

```ts id="w7b2nz"
const mailerClient = new NodemailerService(transporter);
```

---

## Create mailer instance

```ts id="z4q8rt"
const mailer = createMailer({
  mailer: mailerClient,
});
```

---

# Templates

The package supports HTML templates through `EmailTemplate`.

---

## Checklist

- [configure SMTP](#create-transporter)
- [implement provider](#create-mailer-instance)
- [initialize mailer](#create-mailer-instance)

---

## ⬅️ Previous

- [`architecture`](./architecture.md)

## ➡️ Next

- [Express Integration](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)
