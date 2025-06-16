# ✨ Déploiement du projet EasyGroup sur [https://contes-et-legendes.com/easygroup](https://contes-et-legendes.com/easygroup)

## ⚙️ Objectif

Déployer une application fullstack (Angular + Spring Boot + MySQL) avec Docker, accessible à l'URL :
**[https://contes-et-legendes.com/easygroup](https://contes-et-legendes.com/easygroup)**

## 📆 Architecture

* **Frontend** Angular buildé en production, servi via Nginx (dans Docker)
* **Backend** Spring Boot (dans Docker)
* **MySQL** (dans Docker)
* **Nginx serveur hôte** pour le reverse proxy HTTPS avec Let's Encrypt

---

## 🚨 Problèmes rencontrés et solutions

### 1. **Port 3306 déjà utilisé**

**Erreur :** `Error starting userland proxy: listen tcp 0.0.0.0:3306`

* **Cause :** Un serveur MySQL local était déjà actif
* **Solution :** Modifier le port hôte à `3310` dans `docker-compose.yml`

### 2. **ERR\_EMPTY\_RESPONSE sur localhost:4200**

* **Cause :** `ng serve` n'écoutait que sur `localhost`
* **Solution :** Ajouter `--host 0.0.0.0` dans `package.json`

### 3. **Page "Welcome to nginx" affichée**

* **Cause :** Les fichiers Angular n'étaient pas copiés dans le bon dossier (`/browser/` non pris en compte)
* **Solution :**

```dockerfile
COPY --from=build /app/dist/easy-group/browser /usr/share/nginx/html
```

### 4. **Mauvais `baseHref` dans Angular**

* **Cause :** L'application n'était pas prête à être servie sous `/easygroup`
* **Solution :** Utiliser `--base-href /easygroup/` lors du build

### 5. **API appelée sur localhost en prod**

* **Cause :** `environment.ts` utilisé au lieu de `environment.prod.ts`
* **Solution :**

  * Vérification des `fileReplacements` dans `angular.json`
  * Ajout d'une interface `AppEnvironment`
  * Ajout de `apiBaseUrl: '/easygroup/api'` dans `environment.prod.ts`

### 6. **502 Bad Gateway sur /easygroup**

* **Cause :** Nginx reverse proxy redirigeait vers un conteneur non exposé
* **Solution :** Ajouter `4200:80` dans `docker-compose.yml`

### 7. **net::ERR\_CONNECTION\_REFUSED sur /register**

* **Cause :** Appel Angular vers `http://localhost:8080` au lieu du reverse proxy
* **Solution :** Utiliser `environment.apiBaseUrl` dans le code Angular

### 8. **Erreur CORS (403 Forbidden)**

* **Cause :** Le backend ne reconnaissait pas l'origine `https://contes-et-legendes.com`
* **Solution :** Mise à jour de `SecurityConfig.java` :

```java
config.setAllowedOrigins(List.of(
  "http://localhost:4200",
  "https://contes-et-legendes.com"
));
```

---

## ✅ Déploiement final réussi

* Angular servie à `https://contes-et-legendes.com/easygroup`
* API accessible à `/easygroup/api/`
* Reverse proxy Nginx opérationnel
* CORS fonctionnel
* Authentification (login/register) et navigation OK

---

Félicitations pour la mise en ligne ! 🎉
