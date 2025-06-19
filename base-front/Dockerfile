# Étape DEV : ng serve
FROM node:18 AS dev
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]

# Étape BUILD : Angular
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install

# Ajout de l'argument facultatif (par défaut "/")
ARG BASE_HREF=/
RUN npm run build -- --configuration production --base-href=$BASE_HREF

# Étape PROD : Nginx
FROM nginx:alpine AS prod
COPY --from=build /app/dist/easy-group/browser /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
