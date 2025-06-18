# Configuration des environnements

## Fichiers `.env`

- `.env.prod`
```env
DB_NAME=easygroup
DB_USER=root
DB_PASSWORD=root
FRONT_PORT=4200
CONTAINER_FRONT_PORT=80
```

- `.env.staging`
```env
DB_NAME=easygroup_staging
DB_USER=root
DB_PASSWORD=root
FRONT_PORT=4201
CONTAINER_FRONT_PORT=80
```

## Angular

Ajout dans `angular.json` :
```json
"staging": {
  "baseHref": "/easygroup-staging/",
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.staging.ts"
    }
  ]
}
```

## Backend

Ajout de `application-staging.properties` :
```properties
spring.datasource.url=jdbc:mysql://mysql:3306/easygroup_staging
spring.datasource.username=root
spring.datasource.password=root
spring.profiles.active=staging
```
