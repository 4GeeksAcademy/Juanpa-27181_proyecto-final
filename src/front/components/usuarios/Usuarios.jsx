import React, { useEffect, useState } from "react";
import { API } from "../js/BackendURL";

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [editUser, setEditUser] = useState(null);

    // -----------------------------
    // Cargar lista de usuarios
    // -----------------------------
    const cargarUsuarios = async () => {
        try {
            const res = await fetch(`${API}/api/users`); // Usando la constante API
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    // -----------------------------
    // Eliminar usuario
    // -----------------------------
    const eliminarUsuario = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

        await fetch(`${API}/api/users/${id}`, { method: "DELETE" }); // Usando la constante API
        cargarUsuarios();
    };

    // -----------------------------
    // Actualizar usuario (modal)
    // -----------------------------
    const actualizarUsuario = async (e) => {
        e.preventDefault();

        await fetch(`${API}/api/users/${editUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editUser),
        });

        setEditUser(null);
        cargarUsuarios();
    };

    return (
        <div className="container mt-5">
            <h2 className="fw-bold text-primary mb-4">Gestión de Usuarios</h2>

            {/* BOTÓN CREAR */}
            <a href="/usuarios/crear" className="btn btn-success mb-3">Crear usuario</a>

            {/* TABLA DE USUARIOS */}
            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length === 0 ? (
                        <tr><td colSpan="5">No hay usuarios registrados</td></tr>
                    ) : (
                        usuarios.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre}</td>
                                <td>{u.correo}</td>
                                <td>{u.rol}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => setEditUser(u)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarUsuario(u.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* MODAL EDITAR */}
            {editUser && (
                <div className="modal show d-block bg-dark bg-opacity-50">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h4>Editar Usuario</h4>

                            <form onSubmit={actualizarUsuario}>

                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={editUser.nombre}
                                    onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })}
                                />

                                <label>Correo</label>
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    value={editUser.correo}
                                    onChange={(e) => setEditUser({ ...editUser, correo: e.target.value })}
                                />

                                <label>Rol</label>
                                <select
                                    className="form-select mb-2"
                                    value={editUser.rol}
                                    onChange={(e) => setEditUser({ ...editUser, rol: e.target.value })}
                                >
                                    <option value="Usuario">Usuario</option>
                                    <option value="Agricultor">Agricultor</option>
                                    <option value="Administrador">Administrador</option>
                                </select>

                                <button className="btn btn-primary w-100 mt-2">Guardar cambios</button>
                                <button className="btn btn-secondary w-100 mt-2" onClick={() => setEditUser(null)}>
                                    Cancelar
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
