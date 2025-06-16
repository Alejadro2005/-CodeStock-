"""
Controlador de autenticación para la interfaz web.
Gestiona el login, logout y la creación del usuario administrador por defecto.
"""
from flask import Blueprint, render_template, request, redirect, url_for, flash, session, g
from modelos.usuario import Usuario
from database.postgres_database import PostgresDatabase
from database.database_config import DatabaseConfig
import os

auth_bp = Blueprint('auth', __name__)

# Crear usuario administrador por defecto si no existe
def crear_admin_por_defecto():
    """
    Crea un usuario administrador por defecto si no existe en la base de datos.
    """
    try:
        # Verificar si ya existe un usuario administrador
        usuarios = g.db.get_all_users()
        admin_existe = any(u['rol'] == 'admin' for u in usuarios)
        
        if not admin_existe:
            # Crear usuario administrador por defecto
            admin_data = {
                'nombre': 'Administrador',
                'rol': 'admin',
                'password': 'admin123'  # Contraseña por defecto
            }
            g.db.create_user(admin_data)
            print("Usuario administrador creado exitosamente")
    except Exception as e:
        print(f"Error al crear usuario administrador: {str(e)}")

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """
    Muestra el formulario de login y gestiona la autenticación de usuarios.
    """
    if request.method == 'POST':
        nombre_usuario = request.form.get('nombre_usuario')
        password = request.form.get('password')
        try:
            # Buscar usuario por nombre (ignorando mayúsculas/minúsculas)
            usuarios = g.db.get_all_users()
            usuario = next((u for u in usuarios if u['nombre'].lower() == nombre_usuario.lower()), None)
            if usuario and usuario['password'] == password:
                session['user_id'] = usuario['id']
                session['user_role'] = usuario['rol']
                session['user_name'] = usuario['nombre']
                flash('Login exitoso', 'success')
                return redirect(url_for('main.index'))
            else:
                flash('Credenciales incorrectas', 'error')
        except Exception as e:
            flash(f'Error: {str(e)}', 'error')
    return render_template('login.html', usuarios=g.db.get_all_users())

@auth_bp.route('/logout')
def logout():
    """
    Cierra la sesión del usuario actual y redirige al login.
    """
    session.clear()
    flash('Sesión cerrada', 'info')
    return redirect(url_for('auth.login')) 