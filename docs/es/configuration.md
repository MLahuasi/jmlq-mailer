# Configuración — @jmlq/mailer ⚙️

## Configuración básica

El paquete requiere un proveedor de correo que implemente `IMailerClient`.

---

# Implementación con Nodemailer

```
import nodemailer from "nodemailer"
import { NodemailerService } from "@jmlq/mailer/infrastructure"
```

---

## Crear transporter

```
const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET_KEY
  }
})
```

---

## Crear cliente

```
const mailerClient = new NodemailerService(transporter)
```

---

## Crear instancia del mailer

```
const mailer = createMailer({
  mailer: mailerClient
})
```

---

# Templates

El paquete soporta plantillas HTML mediante `EmailTemplate`.

---

## Checklist

- [configurar SMTP](#crear-transporter)
- [implementar proveedor](#crear-instancia-del-mailer)
- [inicializar mailer](#crear-instancia-del-mailer)

---

## ⬅️ Anterior

- [`arquitectura`](./architecture.md)

## ➡️ Siguiente

- [Integración Express](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)
