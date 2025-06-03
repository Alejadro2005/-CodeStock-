# Script de inicialización de la base de datos
Write-Host "Iniciando configuración de la base de datos..."

# Cargar variables de entorno
$envFile = ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $name = $matches[1]
            $value = $matches[2]
            Set-Item -Path "env:$name" -Value $value
        }
    }
}

# Verificar si PostgreSQL está instalado
try {
    $pgVersion = psql --version
    Write-Host "PostgreSQL detectado: $pgVersion"
} catch {
    Write-Host "Error: PostgreSQL no está instalado o no está en el PATH"
    exit 1
}

# Crear la base de datos si no existe
Write-Host "Creando base de datos si no existe..."
$env:PGPASSWORD = $env:DB_PASSWORD
psql -h $env:DB_HOST -p $env:DB_PORT -U $env:DB_USER -tc "SELECT 1 FROM pg_database WHERE datname = '$env:DB_NAME'" | ForEach-Object {
    if ($_ -eq "") {
        psql -h $env:DB_HOST -p $env:DB_PORT -U $env:DB_USER -c "CREATE DATABASE $env:DB_NAME"
        Write-Host "Base de datos creada exitosamente"
    }
}

# Ejecutar el script SQL
Write-Host "Ejecutando script de inicialización..."
psql -h $env:DB_HOST -p $env:DB_PORT -U $env:DB_USER -d $env:DB_NAME -f "tienda_ddl_inserts.sql"

Write-Host "¡Inicialización completada!" 