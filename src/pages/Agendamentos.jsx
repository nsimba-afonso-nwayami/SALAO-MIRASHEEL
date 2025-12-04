import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/agendamentos-table.css";
import toast from "react-hot-toast";

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [buscaCliente, setBuscaCliente] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // FILTRO SOMENTE STATUS
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // LIMITES DE REGISTROS
  const limitePendentes = 10;
  const limiteAtendidos = 10;

  // Buscar agendamentos
  const fetchAgendamentos = async () => {
    setLoading(true);
    setErro("");

    try {
      if (!token) throw new Error("Usuário não autenticado.");

      const response = await fetch("https://api2.nwayami.com/api/agendamentos/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.detail || "Erro ao carregar agendamentos.");

      const agendamentosComNome = data.map((a) => ({
        id: a.id,
        clienteNome: a.nome || "Sem nome",
        profissionalNome: a.profissional || "Não definido",
        servicoNome: a.servico_nome || "Não definido",
        data: a.data,
        hora: a.hora,
        status: a.status,
        observacoes: a.observacoes || "",
      }));

      setAgendamentos(agendamentosComNome);
      toast.success("Agendamentos carregados!");
    } catch (err) {
      setErro(err.message);
      toast.error(err.message || "Erro ao carregar agendamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Atualizar status
  const atualizarStatus = async (id, novoStatus) => {
    try {
      const response = await fetch(
        `https://api2.nwayami.com/api/agendamentos/${id}/atualizar_status/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: novoStatus }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao atualizar status");
      }

      setAgendamentos((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: novoStatus } : a))
      );

      if (novoStatus === "confirmado") toast.success("Agendamento confirmado!");
      if (novoStatus === "cancelado") toast("Agendamento cancelado!", { icon: "❌" });
    } catch (err) {
      //toast.error("Erro ao atualizar status: " + err.message);
      toast.error("Erro ao atualizar status: ");
    }
  };

  // Filtrar agendamentos pelo status e busca do cliente
  const filtrarAgendamentos = (agendamentosArray) =>
    agendamentosArray.filter((a) =>
      a.clienteNome.toLowerCase().includes(buscaCliente.toLowerCase())
    );

  const pendentes = filtrarAgendamentos(
    agendamentos.filter((a) => a.status === "pendente")
  );

  const atendidosFiltrados = filtrarAgendamentos(
    agendamentos
      .filter((a) => a.status !== "pendente")
      .filter((a) => (filtroStatus !== "todos" ? a.status === filtroStatus : true))
  );

  const statusBadge = (status) => {
    const colors = {
      pendente: "badge-yellow",
      confirmado: "badge-green",
      cancelado: "badge-red",
      concluido: "badge-blue",
    };
    return colors[status] || "badge-gray";
  };

  return (
    <>
      <title>Dashboard</title>
      <section className="services">
        <h1 className="heading">Agendamentos</h1>

        {/* Section de busca */}
        <section className="section-search">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              name="tbusca"
              id="search-box"
              placeholder="Busque aqui..."
              value={buscaCliente}
              onChange={(e) => setBuscaCliente(e.target.value)}
            />
            <button type="submit" className="fas fa-search" title="Pesquisar"></button>
          </form>
        </section>

        {loading && <p className="p-loading">Carregando agendamentos...</p>}
        {erro && <p className="p-error">{erro}</p>}
        {!loading && !erro && agendamentos.length === 0 && (
          <p className="p-agenda">Nenhum agendamento encontrado.</p>
        )}

        {/* Pendentes */}
        {pendentes.length > 0 && (
          <>
            <h2 className="h2-agenda">Pendentes</h2>
            <div className="tabela-wrapper">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Serviço</th>
                    <th>Cliente</th>
                    <th>Profissional</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pendentes.slice(0, limitePendentes).map((a) => (
                    <tr key={a.id}>
                      <td>{a.servicoNome}</td>
                      <td>{a.clienteNome}</td>
                      <td>{a.profissionalNome}</td>
                      <td>{a.data}</td>
                      <td>{a.hora}</td>
                      <td>
                        <span className={`badge ${statusBadge(a.status)}`}>{a.status}</span>
                      </td>
                      <td className="acoes">
                        <button
                          className="button confirmar"
                          onClick={() => atualizarStatus(a.id, "confirmado")}
                        >
                          Confirmar
                        </button>
                        <button
                          className="button cancelar"
                          onClick={() => atualizarStatus(a.id, "cancelado")}
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Atendidos / Cancelados */}
        {atendidosFiltrados.length > 0 && (
          <>
            <h2 className="h2-agenda">Confirmados / Cancelados</h2>

            <div className="filtros-container">
              <div>
                <label>Status:</label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="filtro-select"
                >
                  <option value="todos">Todos</option>
                  <option value="confirmado">Confirmados</option>
                  <option value="cancelado">Cancelados</option>
                </select>
              </div>
            </div>

            <div className="tabela-wrapper">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Serviço</th>
                    <th>Cliente</th>
                    <th>Profissional</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {atendidosFiltrados.slice(0, limiteAtendidos).map((a) => (
                    <tr key={a.id}>
                      <td>{a.servicoNome}</td>
                      <td>{a.clienteNome}</td>
                      <td>{a.profissionalNome}</td>
                      <td>{a.data}</td>
                      <td>{a.hora}</td>
                      <td>
                        <span className={`badge ${statusBadge(a.status)}`}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Mensagem se não houver resultados */}
        {!loading && !erro && pendentes.length === 0 && atendidosFiltrados.length === 0 && (
          <p className="p-agenda">Nenhum agendamento encontrado para este cliente.</p>
        )}
      </section>

      <Footer />
    </>
  );
}
