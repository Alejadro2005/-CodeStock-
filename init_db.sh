#!/bin/bash

echo "Iniciando configuración de la base de datos..."

# Cargar variables de entorno
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Verificar si PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "Error: PostgreSQL no está instalado"
    exit 1
fi

# Crear la base de datos si no existe
echo "Creando base de datos si no existe..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || \
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME"

# Ejecutar el script SQL
echo "Ejecutando script de inicialización..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f tienda_ddl_inserts.sql

echo "¡Inicialización completada!" 