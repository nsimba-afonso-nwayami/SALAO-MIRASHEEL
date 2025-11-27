import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/style.css";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchAgendamentos = async () => {
      const token = localStorage.getItem("token"); // pega token do login
      if (!token) {
        setErro("Usuário não está logado.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://api2.nwayami.com/api/agendamentos/meus-agendamentos/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        //console.log("Dados recebidos da API:", response.data); // Para depurar

        setAgendamentos(response.data);
        setErro("");
      } catch (err) {
        //console.error("Erro ao buscar agendamentos:", err);
        setErro(err.response?.data?.erro || "Falha ao carregar agendamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  const formatHora = (hora) => (hora ? hora.substring(0, 5) : "-");

  if (loading) return <p>Carregando agendamentos...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <div className="body">
      <h2>Meus Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p>Você não possui agendamentos.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Profissional</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Status</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => (
              <tr key={agendamento.id}>
                <td>{agendamento.servico?.nome || "-"}</td>
                <td>{agendamento.profissional?.nome || "-"}</td>
                <td>{agendamento.data || "-"}</td>
                <td>{formatHora(agendamento.hora)}</td>
                <td>{agendamento.status || "-"}</td>
                <td>{agendamento.observacoes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}