"""
Módulo principal de la aplicación web Flask para el sistema de gestión de inventario.
Configura la aplicación, la base de datos y los blueprints.
"""
import os
import sys
from pathlib import Path

# Agregar el directorio backend/src al PYTHONPATH
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from flask import Flask, g
from flask_cors import CORS
from dotenv import load_dotenv
from backend.src.database.postgres_database import PostgresDatabase
from backend.src.database.database_config import CURRENT_CONFIG
from backend.web.controllers.auth import auth_bp
from backend.web.controllers.main import main_bp
from backend.web.controllers.productos import productos_bp
from backend.web.controllers.usuarios import usuarios_bp
from backend.web.controllers.ventas import ventas_bp
from backend.web.controllers.historial import historial_bp

# Cargar variables de entorno
def cargar_variables_entorno():
    """
    Carga las variables de entorno desde un archivo .env si existe.
    """
    load_dotenv()

cargar_variables_entorno()

# Configurar la ruta de las plantillas (templates) en frontend/templates
TEMPLATE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'templates'))
app = Flask(__name__, template_folder=TEMPLATE_DIR)
app.secret_key = os.getenv('SECRET_KEY', 'clave_secreta_default')

# Configurar CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuración de la base de datos
app.config['DATABASE'] = PostgresDatabase(CURRENT_CONFIG)

# Registrar blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(main_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(usuarios_bp)
app.register_blueprint(ventas_bp)
app.register_blueprint(historial_bp)

# Imprimir rutas activas para depuración
for rule in app.url_map.iter_rules():
    print(rule, file=sys.stderr)

@app.before_request
def before_request():
    """
    Conectar a la base de datos antes de cada petición HTTP.
    """
    g.db = app.config['DATABASE']
    g.db.connect()

@app.teardown_appcontext
def teardown_db(exception):
    """
    Cerrar la conexión a la base de datos después de cada petición HTTP.
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    """
    Punto de entrada principal de la aplicación web.
    Crea las tablas necesarias y ejecuta el servidor Flask en modo debug.
    """
    db = app.config['DATABASE']
    db.connect()
    db.create_tables()
    db.disconnect()
    # Flask escuchando en 0.0.0.0 para acceso desde otros pods en Kubernetes
    for rule in app.url_map.iter_rules():
        print(rule, file=sys.stderr)
    app.run(host="0.0.0.0", port=5000, debug=True)