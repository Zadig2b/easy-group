# Configuration GitHub Actions

## Fichier `.github/workflows/deploy.yml`

Le pipeline se déclenche sur :

```yaml
on:
  push:
    branches:
      - main
```

### Étapes principales :
1. Checkout du code
2. Setup Java + Node.js + Google Chrome (pour les tests headless Angular)
3. Compilation backend et frontend
4. Tests Angular (Chrome Headless)
5. Connexion à Tailscale via OAuth
6. Connexion SSH vers le Raspberry Pi
7. Déploiement via `git pull` + `docker-compose up`

### Variables utilisées

- `TS_OAUTH_CLIENT_ID`
- `TS_OAUTH_SECRET`
