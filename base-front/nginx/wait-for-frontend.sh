#!/bin/sh
# Attendre que le frontend soit généré avant de lancer nginx
while [ ! -f /usr/share/nginx/html/index.html ]; do
  echo "En attente du build Angular..."
  sleep 1
done

echo "Fichiers Angular détectés, démarrage de Nginx"
exec nginx -g 'daemon off;'
