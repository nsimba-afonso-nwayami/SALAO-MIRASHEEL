import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/style.css";
import "../assets/css/login.css";

export default function CadastrarSe() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api2.nwayami.com/api/register/",
        {
          username: nome,
          email: email,
          password: senha,
        }
      );

      setSucesso("Cadastro realizado com sucesso!");
      setErro("");

      // Redireciona para login após 1s
      setTimeout(() => navigate("/auth/login"), 1000);

    } catch (err) {
      //console.error("Erro ao cadastrar:", err);

      // 🔥🔥 LOG COMPLETO DA RESPOSTA DA API — AQUI 🔥🔥
      //console.log("Resposta da API (erro):", err.response?.data);

      // Tratamentos possíveis retornados pela API
      const apiError =
        err.response?.data?.error ||
        err.response?.data?.errors ||
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Falha ao cadastrar. Verifique os dados.";

      // Se a API retornar um dicionário de erros, exibir o primeiro
      if (typeof apiError === "object") {
        const firstKey = Object.keys(apiError)[0];
        setErro(apiError[firstKey]);
      } else {
        setErro(apiError);
      }

      setSucesso("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <section className="login">
        <form onSubmit={handleCadastro} className="login-form" autoComplete="off">
          <h3>Cadastrar-se</h3>

          <input
            type="text"
            placeholder="Seu nome"
            className="box"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="exemplo@gmail.com"
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          {erro && <p style={{ color: "red" }}>{erro}</p>}
          {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}

          <p>
            Já tenho uma conta <Link to="/auth/login">Entrar</Link>
          </p>
        </form>
      </section>
    </div>
  );
}