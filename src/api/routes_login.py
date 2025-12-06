from flask import Blueprint, request, jsonify
from api.models import User
from werkzeug.security import check_password_hash
import jwt
import datetime
import os

login_bp = Blueprint('login_bp', __name__)

SECRET = os.getenv("JWT_SECRET", "secret123")

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    
    email = data.get("email")
    password = data.get("password")

    # Validaciones
    if not email or not password:
        return jsonify({"message": "Correo y contraseña requeridos"}), 400

    user = User.query.filter_by(correo=email).first()

    if not user:
        return jsonify({"message": "Correo o contraseña incorrectos"}), 400

    if not check_password_hash(user.contraseña, password):
        return jsonify({"message": "Correo o contraseña incorrectos"}), 400

    # Crear token
    payload = {
        "id": user.id,
        "rol": user.rol,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }

    token = jwt.encode(payload, SECRET, algorithm="HS256")

    return jsonify({
        "token": token,
        "rol": user.rol
    }), 200
