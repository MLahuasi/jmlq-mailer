# Troubleshooting — @jmlq/mailer 🩺

## Problema: No se envían correos

Verificar:

- credenciales SMTP
- puerto
- TLS/SSL

---

## Problema: Error de autenticación

Revisar:

```
MAILER_EMAIL
MAILER_SECRET_KEY
```

---

## Problema: template no encontrado

Revisar:

```
MAIL_TEMPLATE_PATH
MAIL_TEMPLATE_EXTENSION
```

---

## Checklist

- [revisar variables env](../../README.es.md#54-variables-de-entorno)
- [verificar SMTP](./configuration.md#crear-transporter)
- [validar templates](./configuration.md#templates)

---

## ⬅️ Anterior

- [`arquitectura`](./architecture.md)

## ➡️ Siguiente

- [Configuración](./configuration.md)
- [Integración Express](./integration-express.md)
