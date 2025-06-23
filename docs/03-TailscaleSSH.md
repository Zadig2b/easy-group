# Connexion SSH avec Tailscale

## Mise en place

1. Installer Tailscale sur la Raspberry Pi.
2. Connecter avec un compte autorisé.
3. Ajouter le tag `tag:ci` :
```bash
sudo tailscale up --advertise-tags=tag:ci --authkey=...
```

4. Vérifier l'accès depuis GitHub Actions avec :
```yaml
- name: Test SSH connection
  run: ssh -o StrictHostKeyChecking=no pi@raspberrypi.tailXYZ.ts.net "echo 'SSH OK'"
```

