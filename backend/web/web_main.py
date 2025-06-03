import os
import sys

# Agregar la raíz del proyecto al PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from backend.web.app import app
from backend.src.database.postgres_database import PostgresDatabase
from backend.src.database.database_config import CURRENT_CONFIG

def inicializar_base_datos():
    """Inicializa la base de datos y crea las tablas necesarias."""
    db = PostgresDatabase(CURRENT_CONFIG)
    db.connect()
    db.create_tables()
    return db

if __name__ == '__main__':
    # Inicializar base de datos
    db = inicializar_base_datos()
    
    # Iniciar la aplicación web
    app.run(debug=True) 