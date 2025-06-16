# Notes de déploiement

Cette page résume les étapes et problèmes rencontrés lors du déploiement d'EasyGroup sur le serveur de production.
Les informations complètes se trouvent dans le fichier [`deployment_notes.md`](../deployment_notes.md).

- Application conteneurisée avec Docker et orchestrée via `docker-compose`.
- Nginx sert de reverse proxy HTTPS avec Let's Encrypt.
- Le frontend Angular est compilé puis servi par Nginx dans un conteneur.
- Le backend Spring Boot et la base MySQL tournent chacun dans un conteneur dédié.

Consultez le document d'origine pour le détail des erreurs courantes et leurs solutions.
