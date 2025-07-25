# 🎯 EasyGroup

**EasyGroup** est une application web permettant de créer des groupes de manière simple et efficace, avec des règles de mixité personnalisées.

---

La documentation détaillée est disponible dans le dossier [docs](docs/).


Pour l'installation et la contribution, consultez le [guide développeur](docs/developpeurs.md).

---


## 🌍 URL du site déployé

🔗 [https://contes-et-legendes.com/easygroup/](https://contes-et-legendes.com/easygroup/)

---

## ✨ Fonctionnalités

- 🔐 Authentification par JWT (inscription, login)
- 📋 Création de listes (représentant des promotions)
- ➕ Ajout / ➖ Suppression de personnes dans une liste
- 🎲 Génération aléatoire de groupes à partir des personnes
- 📜 Historique des tirages
- 📱 Interface responsive ( SCSS personnalisé + Bootstrap)

---

## 🧱 Stack technique

- 🔷 **Frontend** : Angular (Standalone Components, Bootstrap)
- 🟢 **Backend** : Java + Spring Boot
- 🗃️ **Base de données** : MySQL
- ⚙️ **Communication** : REST API
- 🐳 **Conteneurisation** : Docker + Docker Compose
- 🌐 **Serveur** : Raspberry Pi (Linux Debian, Nginx)

---

## 🚀 Lancement du projet en local (Dev)

### 📦 Prérequis

- Node.js `>= 18`
- Angular CLI
- Java 17+
- Maven
- MySQL
- Docker (optionnel)

### 📁 Arborescence

```text
easy-group/
├── frontend/           # Projet Angular
├── backend/            # Projet Spring Boot
├── .env                # Variables d'environnement
├── docker-compose.yml  # Conteneurisation
└── README.md
```

### 🔧 Configuration

#### 1. Variables d’environnement

À la racine du projet, renommez `.env.dev.example` en `.env` et remplissez les champs :

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=brief_group
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
```

#### 2. Backend

Renommez le fichier `backend/src/main/resources/application-local.properties.example` en `application-local.properties` et configurez vos identifiants MySQL.

### 🚀 Initialisation

à la racine du projet, exécuter dans un terminal:

```bash
npm run init:project   # Installe les dépendances et configure la BDD
npm run start:all      # Lance frontend + backend dans un même terminal
```

---

## 📦 Déploiement

- Déployé sur un serveur personnel (Raspberry Pi, Linux Debian)
- Environnements Dev / Prod gérés via `environment.ts`
- Conteneurisation via Docker et `docker-compose`
- Utilisation de Nginx pour la redirection DNS
- Optimisation du build pour production

---

## 🔮 TODO

- 🔁 Corriger le bug de boucle de fetch en cas d’échec : OK ( removed 403 catch from error interceptor)
- 🧪 Finaliser les tests unitaires (actuellement 5/27)
- 🔐 Redirection automatique vers la page d’accueil à la déconnexion: OK
- 🔐 Redirection automatique vers la page d’accueil à l'inscription: OK
- 🗑️ Suppression des listes (frontend)
- 📊 Dashboard : afficher le `drawCount` par liste
- 📆 Draw History : afficher le nombre de tirages dans le titre

### 🧠 Amélioration de l’algorithme de génération des groupes (`utils/group-generator.ts`)

L’algorithme devra prioriser :

1. ❌ Éviter de remettre ensemble deux personnes ayant déjà été dans le même groupe
2. 🎓 Mixer les niveaux techniques
3. 🚻 Mixer les genres

---

## 🛡️ Sécurité

- Authentification sécurisée avec JWT
- CORS configuré dans Spring Boot

---

## 📄 Licence

🛑 Ce projet est à usage **pédagogique**.  
✅ Utilisation **personnelle** ou **éducative** autorisée.

---

## 🙌 Remerciements

Projet réalisé dans le cadre de la formation **Simplon CDA**.  
Un grand merci à toute l'équipe pédagogique pour son accompagnement !
