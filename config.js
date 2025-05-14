// config.js

import { existsSync } from 'fs';
import dotenv from 'dotenv';
import path from 'path';

// Récupère le profil courant (par défaut : dev)
const ENV = process.env.NODE_ENV || 'development';
const envFile = ENV === 'development' ? '.env' : `.env.${ENV}`;

// Chargement du bon fichier .env
const envPath = path.resolve(process.cwd(), envFile);
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`📦 Environnement chargé depuis ${envFile}`);
} else {
  console.warn(`⚠️ Le fichier ${envFile} est introuvable. Utilisation des variables système.`);
}

export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
};

export const frontendPath = 'base-front';
export const backendPath = 'base-back';

export const getMavenCommand = () => {
  const platform = process.platform;
  return platform.startsWith('win') ? '.\\mvnw.cmd install -DskipTests' : './mvnw install -DskipTests';
};
