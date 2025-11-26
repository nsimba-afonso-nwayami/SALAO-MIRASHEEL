// src/pages/Agendamentos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

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
      console.error(err);
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
        `https://api2.nwayami.com/api/agendamentos/${id}/atualizar_status/`, // endpoint atualizado
        {
          method: "POST", // agora é um POST (se estiver utilizando método POST para atualizar status)
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
      console.error(err);
      alert("Erro ao atualizar status: " + err.message);
    }
  };

  const pendentes = agendamentos.filter((a) => a.status === "pendente");
  const atendidos = agendamentos.filter((a) => a.status !== "pendente");

  const statusBadge = (status) => {
    const colors = {
      pendente: "bg-yellow-100 text-yellow-700",
      confirmado: "bg-green-100 text-green-700",
      cancelado: "bg-red-100 text-red-700",
      concluido: "bg-blue-100 text-blue-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <>
      <Header />

      <section className="services px-6 py-12 bg-gray-50">
        <h1 className="heading text-3xl font-bold text-center mb-10 text-purple-700">
          Agendamentos
        </h1>

        {loading && <p className="text-center text-gray-500">Carregando agendamentos...</p>}
        {erro && <p className="text-center text-red-500">{erro}</p>}
        {!loading && !erro && agendamentos.length === 0 && (
          <p className="text-center text-gray-600">Nenhum agendamento encontrado.</p>
        )}

        {/* Pendentes */}
        {pendentes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-yellow-600 mb-6">Pendentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendentes.map((a) => (
                <div
                  key={a.id}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{a.servicoNome}</h3>
                  <p><strong>Cliente:</strong> {a.clienteNome}</p>
                  <p><strong>Profissional:</strong> {a.profissionalNome}</p>
                  <p><strong>Data:</strong> {a.data}</p>
                  <p><strong>Hora:</strong> {a.hora}</p>
                  {a.observacoes && <p><strong>Observações:</strong> {a.observacoes}</p>}
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${statusBadge(a.status)}`}>
                    {a.status}
                  </span>

                  <div className="mt-4 flex gap-2">
                    <button
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                      onClick={() => atualizarStatus(a.id, "confirmado")}
                    >
                      Confirmar
                    </button>
                    <button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                      onClick={() => atualizarStatus(a.id, "cancelado")}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Atendidos / Cancelados */}
        {atendidos.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-blue-600 mt-12 mb-6">
              Atendidos / Cancelados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {atendidos.map((a) => (
                <div
                  key={a.id}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{a.servicoNome}</h3>
                  <p><strong>Cliente:</strong> {a.clienteNome}</p>
                  <p><strong>Profissional:</strong> {a.profissionalNome}</p>
                  <p><strong>Data:</strong> {a.data}</p>
                  <p><strong>Hora:</strong> {a.hora}</p>
                  {a.observacoes && <p><strong>Observações:</strong> {a.observacoes}</p>}
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${statusBadge(a.status)}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
