// src/pages/Agendamentos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/agendamentos-table.css";

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
        clienteNome: a.cliente_nome || "Anônimo",
        profissionalNome: a.profissional_nome || "Não definido",
        servicoNome: a.servico_nome || "Não definido",
        data: a.data,
        hora: a.hora,
        status: a.status,
        observacoes: a.observacoes || "",
      }));

      setAgendamentos(agendamentosComNome);
    } catch (err) {
      //console.error(err);
      setErro(err.message);
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
    } catch (err) {
      /*console.error(err);
      alert("Erro ao atualizar status: " + err.message);*/
    }
  };

  const pendentes = agendamentos.filter((a) => a.status === "pendente");
  const atendidos = agendamentos.filter((a) => a.status !== "pendente");

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
      <Header />

      <section className="services">
        <h1 className="heading">
          Agendamentos
        </h1>

        {loading && <p className="text-center text-gray-500">Carregando agendamentos...</p>}
        {erro && <p className="text-center text-red-500">{erro}</p>}
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
                  {pendentes.map((a) => (
                    <tr key={a.id}>
                      <td>{a.servicoNome}</td>
                      <td>{a.clienteNome}</td>
                      <td>{a.profissionalNome}</td>
                      <td>{a.data}</td>
                      <td>{a.hora}</td>
                      <td>
                        <span className={`badge ${statusBadge(a.status)}`}>
                          {a.status}
                        </span>
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

        {/* Atendidos */}
        {atendidos.length > 0 && (
          <>
            <h2 className="h2-agenda">
              Atendidos / Cancelados
            </h2>

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
                  {atendidos.map((a) => (
                    <tr key={a.id}>
                      <td>{a.servicoNome}</td>
                      <td>{a.clienteNome}</td>
                      <td>{a.profissionalNome}</td>
                      <td>{a.data}</td>
                      <td>{a.hora}</td>
                      <td>
                        <span className={`badge ${statusBadge(a.status)}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
