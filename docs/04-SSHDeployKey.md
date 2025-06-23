# Clé SSH de déploiement

## Problème initial

Une clé SSH avec **passphrase** bloquait les scripts GitHub Actions car la passphrase n'était pas déverrouillable automatiquement.

## Solution

### Génération d'une nouvelle clé **sans passphrase**
```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_nopass -N ""
```

### Ajout dans `~/.ssh/config`
```bash
Host github.com
  IdentityFile ~/.ssh/id_ed25519_nopass
  StrictHostKeyChecking no
```

### Ajout sur GitHub
- Menu "Deploy keys" du dépôt
- Ajouter le contenu de `id_ed25519_nopass.pub`
