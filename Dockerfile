# Use the Node.js 20 image as base
FROM node:20

# Instalar MariaDB desde los repositorios de Debian
RUN apt-get update && \
    apt-get install -y mariadb-server mariadb-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Cambiar el directorio de trabajo en la imagen Docker a /app
WORKDIR /app

# Copiar package.json al directorio /app
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]

