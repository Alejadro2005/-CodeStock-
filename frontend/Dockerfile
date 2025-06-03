FROM node:18-alpine as build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias con optimizaciones
RUN npm ci --prefer-offline --no-audit

# Copiar el código fuente
COPY . .

# Da permisos a la carpeta de la app
RUN chown -R node:node /app

# Cambia al usuario node
USER node

# Construir la aplicación con optimizaciones
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"] 