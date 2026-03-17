# Troubleshooting — @jmlq/mailer 🩺

## Problem: Emails are not being sent

Verify:

- SMTP credentials
- port
- TLS/SSL

---

## Problem: Authentication error

Check:

```id="n2k8sl"
MAILER_EMAIL
MAILER_SECRET_KEY
```

---

## Problem: Template not found

Check:

```id="x7p4dz"
MAIL_TEMPLATE_PATH
MAIL_TEMPLATE_EXTENSION
```

---

## Checklist

- [check environment variables](../../README.md#54-environment-variables)
- [verify SMTP](./configuration.md#create-transporter)
- [validate templates](./configuration.md#templates)

---

## ⬅️ Previous

- [`architecture`](./architecture.md)

## ➡️ Next

- [Configuration](./configuration.md)
- [Express Integration](./integration-express.md)
