import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/agendar.css";

export default function Agendar() {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        servico: '',
        data: '',
        hora: '',
        observacoes: '',
        profissional: '', // pode ser vazio
    });

    const [servicos, setServicos] = useState([]); // serviços da API

    const navigate = useNavigate();

    // Atualiza o estado do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Verifica token (opcional)
    const verifyToken = () => {
        const token = localStorage.getItem("token");
        console.log("Token no LocalStorage:", token);
        if (!token) {
            alert("A sua sessão expirou ou não foi encontrada. Por favor, faça login novamente.");
            localStorage.removeItem("token");
            return false;
        }
        return true;
    };

    // Busca serviços da API
    useEffect(() => {
        verifyToken(); // apenas debug; não bloqueia o envio
        const fetchServicos = async () => {
            try {
                const response = await fetch("https://api2.nwayami.com/api/servicos/");
                const data = await response.json();
                setServicos(data); // preenche o select
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };
        fetchServicos();
    }, [navigate]);

    // Envia formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Campos obrigatórios
        const requiredFields = ['data', 'hora', 'servico'];
        const missing = requiredFields.filter(field => !formData[field]);
        if (missing.length > 0) {
            alert("Por favor, preencha os seguintes campos: " + missing.join(", "));
            return;
        }

        try {
            const payload = {
                cliente: null, // não envia string vazia
                profissional: formData.profissional || null,
                servico: parseInt(formData.servico), // converte para número
                data: formData.data,
                hora: formData.hora,
                observacoes: formData.observacoes || "",
            };

            console.log("Dados que serão enviados:", payload); // debug

            const response = await fetch("https://api2.nwayami.com/api/agendamentos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Agendamento realizado com sucesso!");
                setFormData({
                    nome: '',
                    telefone: '',
                    servico: '',
                    data: '',
                    hora: '',
                    observacoes: '',
                    profissional: '',
                });
            } else {
                alert("Ocorreu um erro ao realizar o agendamento: " + (data.detail || 'Erro desconhecido.'));
            }

        } catch (error) {
            console.error("Erro ao enviar o agendamento:", error);
            alert("Erro ao enviar o agendamento. Tente novamente mais tarde.");
        }
    };

    return (
        <>
            <title>Agendar | Salão Mirashell</title>

            <Header />

            <section className="banner agendar">
                <div className="content">
                    <h3>Agende a Sua Sessão</h3>
                    <p>Escolha o serviço, selecione a data e garanta o seu atendimento com nossos profissionais.</p>
                </div>
            </section>

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
                                type="tel" 
                                name="telefone" 
                                placeholder="Seu telefone" 
                                required 
                                value={formData.telefone}
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
                                rows="20" 
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
