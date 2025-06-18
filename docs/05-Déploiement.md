# Déploiement automatique

## Commande exécutée à distance via SSH

```bash
ssh pi@raspberrypi.tailXYZ.ts.net "
  cd easy-group &&
  git pull origin main &&
  docker-compose --env-file .env.staging -f docker-compose.staging.yml up --build -d
"
```

## Pré-requis sur la Raspberry Pi

- Clé SSH fonctionnelle pour `git@github.com`
- Répertoire `~/easy-group` cloné manuellement au préalable
- Fichier `.env.staging` prêt
- Docker + Docker Compose installés

## Test manuel
```bash
cd ~/easy-group
git pull origin main
docker-compose --env-file .env.staging -f docker-compose.staging.yml up --build -d
```
