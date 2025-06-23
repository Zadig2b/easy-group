# Architecture du système

## Vue d'ensemble

- **Frontend** : Angular 17
- **Backend** : Spring Boot 3 + Maven
- **CI/CD** : GitHub Actions
- **Déploiement** : Docker Compose sur un Raspberry Pi
- **Communication sécurisée** : Tailscale (SSH via VPN)

## Objectif

Déployer automatiquement la dernière version du projet dès qu'une modification est poussée sur la branche `main`.
