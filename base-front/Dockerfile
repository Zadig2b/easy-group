# Étape DEV : ng serve
FROM node:18 AS dev
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]

# Étape PROD : Nginx
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
