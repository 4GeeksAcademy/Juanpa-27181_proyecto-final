import React, { useState } from "react";
import { API } from "../js/BackendURL"; 
import { useNavigate } from "react-router-dom";

export default function CrearUsuario() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
        rol: "usuario"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const crearUsuario = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Error al crear usuario");
                return;
            }

            alert("Usuario creado correctamente");
            navigate("/usuarios");

        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="fw-bold text-primary mb-4">Crear nuevo usuario</h2>

            <form onSubmit={crearUsuario} className="card p-4 shadow">

                <label className="fw-bold">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    className="form-control mb-3"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />

                <label className="fw-bold">Correo</label>
                <input
                    type="email"
                    name="correo"
                    className="form-control mb-3"
                    value={form.correo}
                    onChange={handleChange}
                    required
                />

                <label className="fw-bold">Contraseña</label>
                <input
                    type="password"
                    name="contraseña"
                    className="form-control mb-3"
                    value={form.contraseña}
                    onChange={handleChange}
                    required
                />

                <label className="fw-bold">Rol</label>
                <select
                    name="rol"
                    className="form-select mb-3"
                    value={form.rol}
                    onChange={handleChange}
                >
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                <button className="btn btn-success w-100">Crear usuario</button>

                <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={() => navigate("/usuarios")}
                >
                    Cancelar
                </button>

            </form>

        </div>
    );
}
