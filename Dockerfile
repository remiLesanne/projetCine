# Stage build
FROM node:20-alpine as build
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le projet et builder Angular
COPY . .
RUN npm run build -- --configuration production

# Stage nginx
FROM nginx:alpine

# Copier le build Angular correct
COPY --from=build /app/dist/frontTP1/browser /usr/share/nginx/html

# Copier la config nginx (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
