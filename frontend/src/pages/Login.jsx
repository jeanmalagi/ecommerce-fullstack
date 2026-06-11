import { useState } from "react";

import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // ✅ Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      // ✅ Salva token
      localStorage.setItem("token", response.token);

      // ✅ Salva usuário
      localStorage.setItem("user", JSON.stringify(response.user));

      // ✅ Redireciona admin
      if (response.user.is_admin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/products";
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao fazer login";

      alert(msg);
    }
  };

  return (
    <div style={page}>
      {/* ✅ Card */}
      <div style={card}>
        {/* ✅ Logo */}
        <h1 style={logo}>🛒 MyStore</h1>

        <p style={subtitle}>Bem-vindo de volta 👋</p>

        {/* ✅ Form */}
        <form onSubmit={handleLogin} style={form}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button type="submit" style={button}>
            Entrar
          </button>
        </form>

        {/* ✅ Rodapé */}
        <p style={footerText}>Sua loja favorita online 🚀</p>
      </div>
    </div>
  );
}

//
// ✅ STYLES
//

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  padding: "20px",
};

const card = {
  width: "100%",
  maxWidth: "380px",
  backgroundColor: "#fff",
  padding: "35px",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const logo = {
  textAlign: "center",
  color: "#ee4d2d",
  marginBottom: "8px",
  fontSize: "32px",
};

const subtitle = {
  textAlign: "center",
  color: "#666",
  marginBottom: "25px",
  fontSize: "14px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const input = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
};

const button = {
  marginTop: "5px",
  backgroundColor: "#ee4d2d",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
};

const footerText = {
  marginTop: "20px",
  textAlign: "center",
  color: "#999",
  fontSize: "13px",
};
