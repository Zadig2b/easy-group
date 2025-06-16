# Guide développeur

Cette section décrit comment configurer et lancer l'application en environnement de développement.

## Prérequis

- Node.js (version 18 ou supérieure)
- Angular CLI
- Java 17+
- Maven
- MySQL
- Docker (optionnel)

## Installation

1. Copiez le fichier `.env.dev.example` à la racine en `.env` et renseignez vos paramètres MySQL.
2. Dans `base-back/src/main/resources`, renommez `application-local.properties.example` en `application-local.properties` puis indiquez vos identifiants MySQL.
3. Exécutez :

```bash
npm run init:project
```

Cette commande installe les dépendances et initialise la base de données.

4. Lancez ensuite l'application complète :

```bash
npm run start:all
```

Le frontend Angular et le backend Spring Boot démarrent alors simultanément.


