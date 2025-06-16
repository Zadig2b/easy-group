# Guide développeur 🚀

Ce guide explique comment installer et contribuer à EasyGroup en local.

## Pré-requis 🧰

- Node.js **18+**
- Angular CLI
- Java **17+**
- Maven
- MySQL
- Docker *(optionnel)*

## Arborescence du projet 📁

```
base-front/    # Application Angular
base-back/     # API Spring Boot
.env           # Variables d'environnement
Dockerfile / docker-compose.yml
```

## Configuration ⚙️

1. Copier `.env.dev.example` en `.env` à la racine puis renseigner vos identifiants MySQL.
2. Renommer `base-back/src/main/resources/application-local.properties.example` en `application-local.properties` et y mettre les mêmes informations.

## Initialisation 🏗️

À la racine, lancez :

```bash
npm run init:project
```

Cette commande installe toutes les dépendances et crée la base.

## Démarrage en local ▶️

```bash
npm run start:all
```

Le frontend Angular et le backend Spring Boot se lancent ensemble.

## Lancer les tests ✅

- **Backend** :

```bash
./mvnw -q test
```

- **Frontend** :

```bash
npm test --silent
```

Les tests peuvent échouer si Maven ou Chrome ne sont pas disponibles. Consultez [`testconfig.md`](../testconfig.md) pour plus de détails.
