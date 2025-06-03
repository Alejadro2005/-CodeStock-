FROM python:3.9-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements.txt
COPY requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Crear estructura de directorios
RUN mkdir -p /app/backend/src

# Copiar el código de la aplicación
COPY . /app/backend/

# Agregar el directorio al PYTHONPATH
ENV PYTHONPATH=/app

# Exponer el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "-m", "backend.web.app"] 