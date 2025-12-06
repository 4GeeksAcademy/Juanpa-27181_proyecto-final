import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Correo inválido");
      return;
    }

    if (password.trim() === "") {
      setError("La contraseña no puede estar vacía");
      return;
    }

    try {

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      // Guardar JWT
      localStorage.setItem("token", data.token);

      // Redirigir según rol
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError("Error de servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && <p style={{color:"red"}}>{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
