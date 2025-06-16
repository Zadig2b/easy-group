# 🤖 AGENTS.md

## 🧪 Test instructions

### 🖥️ Backend (Java / Maven)

#### 🎯 Objectif : Permettre l'exécution des tests sans connexion Internet

1. Exécute la commande suivante pour pré-télécharger toutes les dépendances Maven :

   ```bash
   ./mvnw dependency:go-offline
   ```

   Cela génère un cache local dans `~/.m2/repository`.

2. (Optionnel mais utile pour Codex) Archive ce cache :

   ```bash
   tar -czf maven-cache.tar.gz -C ~/.m2 repository
   ```

   Puis place-le à la racine du projet, ou configure ton runner pour utiliser ce cache.

3. Pour exécuter les tests offline :

   ```bash
   ./mvnw test
   ```

### 💻 Frontend (Angular)

#### 🎯 Objectif : Exécuter les tests sans Chrome installé

#### 🔁 Adapter `karma.conf.js`

1. Modifier le fichier `karma.conf.js` :

   ```js
   process.env.CHROME_BIN = require('puppeteer').executablePath();

   module.exports = function(config) {
     config.set({
       browsers: ['ChromeHeadless'],
       // autres options
     });
   };
   ```

2. Installer les dépendances nécessaires :

   ```bash
   npm install --save-dev karma-chrome-launcher puppeteer
   ```

3. Exécuter les tests :

   ```bash
   npm test
   ```

#### ✅ Alternative : Migrer vers Jest (plus léger, sans navigateur requis)

## 🧠 Résumé des erreurs connues

* `Maven dependencies could not be fetched`: réseau requis ou utiliser `dependency:go-offline`
* `Chrome not installed`: utiliser `ChromeHeadless` + Puppeteer

---

## 📎 Conseils

* Documente toute étape spécifique dans ce fichier si des contraintes particulières apparaissent.
* Regénère le cache `.m2` si de nouvelles dépendances sont ajoutées.
