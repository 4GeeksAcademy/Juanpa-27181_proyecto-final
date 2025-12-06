import click
from api.models import db, User
from werkzeug.security import generate_password_hash

def setup_commands(app):

    @app.cli.command("crear-admin")
    def crear_admin():
        """Crear usuario administrador."""
        password_hash = generate_password_hash("123456")

        # verificar si ya existe
        existing = User.query.filter_by(correo="admin@test.com").first()
        if existing:
            print("El admin ya existe.")
            return

        user = User(
            nombre="Admin",
            correo="admin@test.com",
            contraseña=password_hash,
            rol="admin",
            is_active=True
        )

        db.session.add(user)
        db.session.commit()

        print("Usuario admin creado correctamente")
