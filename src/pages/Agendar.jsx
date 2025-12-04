import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/agendar.css";
import toast from "react-hot-toast";

export default function Agendar() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        servico: "",
        data: "",
        hora: "",
        observacoes: "",
        profissional: "",
    });

    const [servicos, setServicos] = useState([]);

    const navigate = useNavigate();

    // Atualizar campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Buscar serviços da API
    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await fetch("https://api2.nwayami.com/api/servicos/");
                const data = await response.json();
                setServicos(data);
            } catch (error) {
                toast.error("Erro ao carregar serviços.");
            }
        };
        fetchServicos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const required = ["nome", "servico", "data", "hora"];
        const missing = required.filter(field => !formData[field]);

        if (missing.length > 0) {
            toast.error("Preencha os seguintes campos: " + missing.join(", "));
            return;
        }

        const payload = {
            nome: formData.nome,
            email: formData.email || "",
            profissional: formData.profissional || null,
            servico: parseInt(formData.servico),
            data: formData.data,
            hora: formData.hora,
            observacoes: formData.observacoes || "",
        };

        // Mostra toast de carregamento
        const loadingToast = toast.loading("Enviando agendamento...");

        try {
            const response = await fetch("https://api2.nwayami.com/api/agendamentos/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                // Atualiza toast de loading para sucesso
                toast.success("Agendamento realizado com sucesso!", { id: loadingToast });

                setFormData({
                    nome: "",
                    email: "",
                    servico: "",
                    data: "",
                    hora: "",
                    observacoes: "",
                    profissional: "",
                });
            } else {
                // Atualiza toast de loading para erro
                toast.error("Erro ao agendar!", { id: loadingToast });
            }
        } catch (error) {
            toast.error("Erro ao realizar o agendamento.", { id: loadingToast });
        }
    };

    return (
        <>
            <title>Agendar | Salão Mirashell</title>

            <section className="visit" id="agendamento">
                <h1 className="heading">Agende Sua Sessão</h1>

                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <h3>Marque o seu atendimento</h3>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                required
                                value={formData.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="email"
                                name="email"
                                placeholder="Seu email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputBox">
                            <select
                                name="servico"
                                required
                                value={formData.servico}
                                onChange={handleChange}
                            >
                                <option value="">Selecione o serviço</option>
                                {servicos.map((servico) => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="inputBox">
                            <input
                                type="date"
                                name="data"
                                required
                                value={formData.data}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="time"
                                name="hora"
                                required
                                value={formData.hora}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inputBox">
                            <textarea
                                name="observacoes"
                                cols="10"
                                rows="5"
                                placeholder="Observações adicionais (opcional)"
                                value={formData.observacoes}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn">
                            Confirmar Agendamento
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}
