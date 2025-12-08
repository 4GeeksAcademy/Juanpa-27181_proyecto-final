import React, { useState } from "react";
import { API } from "../js/BackendURL";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    contraseña: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Error de conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="h3 fw-bold mb-1" style={{ color: '#4CAF50' }}>TeleDomoFarm</h1>
              <p className="text-muted mb-0">Inicia sesión para continuar</p>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="danger" className="d-flex align-items-center py-2">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div className="small">{error}</div>
              </Alert>
            )}

            <Form onSubmit={iniciarSesion} className="mt-4">
              {/* Email Field */}
              <Form.Group className="mb-3">
                <Form.Label className="small text-secondary">Correo electrónico</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FiMail className="text-secondary" />
                  </span>
                  <Form.Control
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-1"
                    style={{ borderColor: '#616161' }}
                  />
                </div>
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Form.Label className="small text-secondary mb-0">Contraseña</Form.Label>
                  <Link 
                    to="/recuperar-contrasena" 
                    className="small text-decoration-none" 
                    style={{ color: '#64B5F6' }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FiLock className="text-secondary" />
                  </span>
                  <Form.Control
                    type="password"
                    name="contraseña"
                    value={form.contraseña}
                    onChange={handleChange}
                    required
                    className="border-start-0 ps-1"
                    style={{ borderColor: '#616161' }}
                  />
                </div>
              </Form.Group>

              {/* Remember Me */}
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="remember"
                  label="Recordar mi sesión"
                  className="small text-secondary"
                />
              </Form.Group>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-100 py-2 mb-3" 
                disabled={isLoading}
                style={{ 
                  backgroundColor: '#4CAF50', 
                  border: 'none',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#43A047')}
                onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#4CAF50')}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Procesando...
                  </>
                ) : 'Iniciar sesión'}
              </Button>

              {/* Register Link */}
              <div className="text-center mt-4">
                <p className="small text-muted mb-2">
                  ¿No tienes una cuenta?{' '}
                  <Link 
                    to="/registro" 
                    className="text-decoration-none fw-medium" 
                    style={{ color: '#4CAF50' }}
                  >
                    Regístrate
                  </Link>
                </p>
                <Button 
                  variant="link" 
                  className="text-decoration-none p-0" 
                  onClick={() => navigate("/")}
                >
                  <FiArrowLeft className="me-1" /> Volver al inicio
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}