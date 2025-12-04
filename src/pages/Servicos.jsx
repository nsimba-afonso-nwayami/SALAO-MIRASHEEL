import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/agendamentos-table.css";
import toast from "react-hot-toast";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [buscaServico, setBuscaServico] = useState("");
  const token = localStorage.getItem("token");

  const limiteServicos = 6; // Limite para 6 registros

  // Buscar serviços
  const fetchServicos = async () => {
    setLoading(true);
    setErro("");

    try {
      if (!token) throw new Error("Usuário não autenticado.");

      const response = await fetch("https://api2.nwayami.com/api/servicos/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.detail || "Erro ao carregar serviços.");

      const servicosFormatados = data.map((s) => ({
        id: s.id,
        nome: s.nome || "Sem nome",
        preco: s.preco !== null ? s.preco : "-",
        categoria: s.categoria || "-",
      }));

      setServicos(servicosFormatados);
      toast.success("Serviços carregados!");
    } catch (err) {
      setErro(err.message);
      toast.error(err.message || "Erro ao carregar serviços.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  // Filtrar serviços pelo nome
  const servicosFiltrados = servicos.filter((s) =>
    s.nome.toLowerCase().includes(buscaServico.toLowerCase())
  );

  // Deletar serviço
  const deletarServico = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este serviço?")) return;

    try {
      const response = await fetch(`https://api2.nwayami.com/api/servicos/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao deletar serviço.");

      setServicos((prev) => prev.filter((s) => s.id !== id));
      toast.success("Serviço deletado com sucesso!");
    } catch (err) {
      toast.error("Erro ao deletar serviço: " + err.message);
    }
  };

  return (
    <>
    <title>Serviços | Dashboard</title>
      <section className="services">
        <h1 className="heading">Serviços Cadastrados</h1>

        {/* Section de busca */}
        <section className="section-search">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              name="tbusca"
              id="search-box"
              placeholder="Busque aqui..."
              value={buscaServico}
              onChange={(e) => setBuscaServico(e.target.value)}
            />
            <button type="submit" className="fas fa-search" title="Pesquisar"></button>
          </form>
        </section>

        {loading && <p className="p-loading">Carregando serviços...</p>}
        {erro && <p className="p-error">{erro}</p>}
        {!loading && !erro && servicos.length === 0 && (
          <p className="p-agenda">Nenhum serviço encontrado.</p>
        )}

        {servicosFiltrados.length > 0 && (
          <div className="tabela-wrapper">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {servicosFiltrados.slice(0, limiteServicos).map((s) => (
                  <tr key={s.id}>
                    <td>{s.nome}</td>
                    <td>{s.preco}</td>
                    <td>{s.categoria}</td>
                    <td className="acoes">
                      <button
                        className="button confirmar"
                        onClick={() => toast("Funcionalidade de edição não implementada.")}
                      >
                        Editar
                      </button>
                      <button
                        className="button cancelar"
                        onClick={() => deletarServico(s.id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !erro && servicosFiltrados.length === 0 && (
          <p className="p-agenda">Nenhum serviço encontrado para essa busca.</p>
        )}
      </section>

      <Footer />
    </>
  );
}
