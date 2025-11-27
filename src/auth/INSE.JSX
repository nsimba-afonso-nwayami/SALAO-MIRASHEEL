import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import "../assets/css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false); // Adicionando estado de loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Inicia o loading
    setErro("");       // Limpa qualquer erro anterior

    try {
      // 🔐 Faz a requisição POST para o backend
      const response = await fetch("https://api2.nwayami.com/api-token-auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: senha,
        }),
      });

      const data = await response.json();
      //console.log("Resposta da API:", data); // Logando resposta completa

      if (!response.ok) {
        throw new Error(data?.detail || "Usuário ou senha inválidos");
      }

      // ✅ Obtém o token de acesso da resposta
      const accessToken = data.token;
      const refreshToken = data.refresh;
      const userId = data?.user_id || data?.id || data?.user?.id; // Verificando diferentes formas de ID

      if (!accessToken) throw new Error("Token de acesso não encontrado na resposta.");

      // 💾 Salva os tokens no localStorage com chave consistente
      localStorage.setItem("token", accessToken); // Correção: chave correta para o accessToken
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken); // Correção: chave correta para o refreshToken

      // Se o ID do usuário estiver presente, armazena no localStorage
      if (userId) {
        localStorage.setItem("clienteId", userId); // Armazenando ID do cliente no localStorage
        //console.log("ID do usuário encontrado e salvo:", userId);
      } else {
        //console.log("ID do usuário não encontrado na resposta da API.");
      }

      //console.log("✅ Login bem-sucedido. Token salvo:", accessToken);

      // 🔀 Redireciona para a página inicial ou dashboard
      navigate("/");

    } catch (err) {
      //console.error("❌ Erro no login:", err);
      setErro(err.message);  // Exibe mensagem de erro
    } finally {
      setLoading(false); // Finaliza o loading
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

          {/* Botão de login com desabilitação durante o carregamento */}
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
