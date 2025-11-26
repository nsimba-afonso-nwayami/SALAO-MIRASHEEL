import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import "../assets/css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const response = await fetch("https://api2.nwayami.com/api/jwt-logar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: senha,
        }),
      });

      // Recebe o texto bruto da resposta
      const textData = await response.text();
      alert("Resposta bruta da API:\n" + textData);

      // Converte para JSON
      const data = JSON.parse(textData);
      console.log("Resposta da API (JSON):", data);

      if (!response.ok) {
        throw new Error(data?.detail || "Usuário ou senha inválidos");
      }

      // JWT token correto
      const accessToken = data.access;
      const userId = data.user_id;
      const isStaff = data.is_staff || false;
      const isSuperuser = data.is_superuser || false;

      if (!accessToken) throw new Error("Token de acesso não encontrado na resposta.");

      // Salva token e flags de admin
      localStorage.setItem("token", accessToken);
      localStorage.setItem("isAdmin", (isStaff || isSuperuser).toString());

      if (userId) {
        localStorage.setItem("clienteId", userId);
        console.log("ID do usuário encontrado e salvo:", userId);
      }

      console.log("✅ Login bem-sucedido. Token salvo:", accessToken);
      navigate("/"); // redireciona para a home

    } catch (err) {
      console.error("❌ Erro no login:", err);
      setErro(err.message);
      alert("Erro no login:\n" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <section className="login">
        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
          <h3>PAINEL ADMINISTRATIVO</h3>

          <input
            type="text"
            placeholder="Exemplo: DionisioAndre"
            className="box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Sua senha"
            className="box"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <p>
            Esqueceu a senha? <Link to="/auth/recuperar-senha">clica aqui</Link>
          </p>
          <p>
            Não tem uma conta? <Link to="/auth/cadastrar-se">Cria uma conta</Link>
          </p>
        </form>
      </section>
    </div>
  );
}
