// init-project.js

import { existsSync } from 'fs';
import { exec } from 'child_process';
import { createConnection } from 'mysql2/promise';
import figlet from 'figlet';
import { platform as _platform } from 'os';
import dotenv from 'dotenv';
dotenv.config();

async function checkEnvFile() {
  if (!existsSync('.env')) {
    console.error('❌ Fichier .env manquant.');
    console.log('ℹ️ Merci de copier "exemple.env" en ".env" puis de le remplir :');
    console.log('cp exemple.env .env');
    process.exit(1);
  }
}

async function createDatabase() {
  try {
    console.log('🔵 Connexion à MySQL...');
    const connection = await createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true, // permet plusieurs requêtes si besoin
    });

    console.log('🛠️ Vérification de la base de données...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Base de données "${process.env.DB_NAME}" prête.`);
    await connection.end();
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      console.error('❌ Impossible de se connecter à MySQL. Vérifie que ton serveur MySQL est bien lancé.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('❌ Accès refusé à MySQL. Vérifie ton utilisateur ou ton mot de passe dans .env.');
    } else {
      console.error('❌ Erreur inattendue:', err.message);
    }
    process.exit(1);
  }
}

function getMavenCommand() {
    const platform = _platform();
    if (platform.startsWith('win')) {
      return '.\\mvnw.cmd install -DskipTests';
    } else {
      return './mvnw install -DskipTests';
    }
  }
  

function installDependencies() {
    return new Promise((resolve, reject) => {
      console.log('🔵 Installation des dépendances frontend...');
      exec('npm install', { cwd: 'base-front' }, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Erreur installation frontend: ${error.message}`);
          return reject(error);
        }
        console.log(stdout);
  
        console.log('🔵 Installation des dépendances backend...');
        const mavenCmd = getMavenCommand();
        exec(mavenCmd, { cwd: 'base-back' }, (error2, stdout2, stderr2) => {
          console.log(stdout2);   // ✅ log du stdout Maven
          console.error(stderr2); // ✅ log du stderr Maven
          if (error2) {
            console.error(`❌ Erreur installation backend: ${error2.message}`);
            return reject(error2);
          }
          resolve();
        });
        
      });
    });
  }
  

function printSuccessMessage() {
  figlet('Project Ready 🚀', (err, data) => {
    if (err) {
      console.error('Erreur affichage final:', err);
      console.log('🎉 Projet prêt !');
      return;
    }
    console.log(data);
    console.log('\n✅ Tout est installé. Tu peux maintenant lancer :');
    console.log('npm run start:all\n');
  });
}

async function init() {
  console.log('🚀 Initialisation du projet...');
  await checkEnvFile();
  await createDatabase();
  await installDependencies();
  printSuccessMessage();
}

init();
