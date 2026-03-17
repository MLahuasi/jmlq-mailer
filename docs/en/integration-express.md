# Express Integration — @jmlq/mailer 🚏

## 🎯 Objective

Integrate the package into an Express application.

---

# Create middleware

```ts id="m2k9fd"
export function attachMailer(mailer) {
  return (req, res, next) => {
    req.mailer = mailer;
    next();
  };
}
```

---

# Register middleware

```ts id="q7w3lp"
app.use(attachMailer(mailer));
```

---

# Usage in controller

```ts id="x8v2rt"
await req.mailer.send({
  to: user.email,
  subject: "Verify account",
  templateId: "verify-email",
  templateData: {
    app: process.env.APP_NAME,
  },
});
```

---

## Checklist

- [create mailer instance](./configuration.md#create-mailer-instance)
- [register middleware](#register-middleware)
- [use mailer in controllers](#usage-in-controller)

---

## ⬅️ Previous

- [`architecture`](./architecture.md)

## ➡️ Next

- [Configuration](./configuration.md)
- [Troubleshooting](./troubleshooting.md)
