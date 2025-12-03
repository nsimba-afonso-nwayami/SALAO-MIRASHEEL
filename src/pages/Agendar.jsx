import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/agendar.css";

export default function Agendar() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",  
        servico: "",
        data: "",
        hora: "",
        observacoes: "",
        profissional: "", // opcional
    });

    const [servicos, setServicos] = useState([]);

    const navigate = useNavigate();

    // Atualiza valores do formulário
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
                //console.error("Erro ao buscar serviços:", error);
            }
        };
        fetchServicos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valida campos obrigatórios
        const required = ["nome", "servico", "data", "hora"];
        const missing = required.filter(field => !formData[field]);

        if (missing.length > 0) {
            alert("Preencha os seguintes campos: " + missing.join(", "));
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

        //console.log("Enviando:", payload);

        try {
            const response = await fetch("https://api2.nwayami.com/api/agendamentos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            //console.log("Resposta:", data);

            if (response.ok) {
                alert("Agendamento realizado com sucesso!");

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
                alert("Erro ao agendar: ");
                //alert("Erro ao agendar: " + (data.detail || "Erro desconhecido"));
            }

        } catch (error) {
            //console.error("Erro ao enviar:", error);
            alert("Erro ao realizar o agendamento. Tente mais tarde.");
        }
    };

    return (
        <>
            <title>Agendar | Salão Mirashell</title>

            <Header />

            <section className="visit" id="agendamento">
                <h1 className="heading">Agende Sua Sessão</h1>

                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <h3>Marque o seu atendimento</h3>

                        {/* Nome */}
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

                        {/* Email */}
                        <div className="inputBox">
                            <input
                                type="email"
                                name="email"
                                placeholder="Seu email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Serviço */}
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

                        {/* Data */}
                        <div className="inputBox">
                            <input
                                type="date"
                                name="data"
                                required
                                value={formData.data}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Hora */}
                        <div className="inputBox">
                            <input
                                type="time"
                                name="hora"
                                required
                                value={formData.hora}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Observações */}
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
