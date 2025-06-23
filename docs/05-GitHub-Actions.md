# GitHub Actions

## Déclencheur

```yaml
on:
  push:
    branches:
      - main
```

## Étapes

```yaml
- Checkout du repo
- Build Backend Java (avec Maven)
- Build Frontend Angular (npm)
- Lancer les tests
- Connexion SSH au serveur distant
- Pull & Restart Docker Compose
```

Secrets requis :
- `STAGING_HOST`
- `STAGING_USER`
- `STAGING_SSH_KEY`
