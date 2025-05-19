// src/app/config/app.config.ts
import { InjectionToken } from '@angular/core';

export interface GlobalConfig {
  appName: string;
  baseUrl: string;
  apiBaseUrl: string;
  description: string;
  author: string;
  authorlink: string;
}

export const GLOBAL_CONFIG = new InjectionToken<GlobalConfig>('global.config');

export const globalConfig: GlobalConfig = {
  appName: 'Easy Group',
  baseUrl: '/',
  apiBaseUrl: 'http://localhost:8080/api', 
  description:
    'Notre application vous aide à organiser vos groupes de travail de manière équitable et efficace, tout en gardant un historique.',
    author: 'Romain Dugeay',
    authorlink: 'https://contes-et-legendes.com/romain/'
};
