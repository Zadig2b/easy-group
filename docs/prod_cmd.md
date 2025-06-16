redémarrer les conteneurs après un git pull en prod:

```bash
docker compose --env-file .env.prod up --build -d

```

éditer bdd prod:

 mysql -u root -p -h localhost -P 3310