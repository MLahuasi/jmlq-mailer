# Integración con Express — @jmlq/mailer 🚏

## 🎯 Objetivo

Integrar el paquete en una aplicación Express.

---

# Crear middleware

```
export function attachMailer(mailer) {
  return (req, res, next) => {
    req.mailer = mailer
    next()
  }
}
```

---

# Registrar middleware

```
app.use(attachMailer(mailer))
```

---

# Uso en controlador

```
await req.mailer.send({
  to: user.email,
  subject: "Verify account",
  templateId: "verify-email",
  templateData: {
    app: process.env.APP_NAME
  }
})
```

---

## Checklist

- [crear instancia mailer](./configuration.md#crear-instancia-del-mailer)
- [registrar middleware](#registrar-middleware)
- [usar mailer en controllers](#uso-en-controlador)

---

## ⬅️ Anterior

- [`arquitectura`](./architecture.md)

## ➡️ Siguiente

- [Configuración](./configuration.md)
- [Troubleshooting](./troubleshooting.md)
