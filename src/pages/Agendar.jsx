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
        profissional: '', // Pode ser vazio ou selecionado
    });

    const navigate = useNavigate(); // Usado para navegação caso o cliente não esteja logado

    // Função para atualizar o estado do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Função para verificar a validade do token (não necessário para enviar agendamento sem login)
    const verifyToken = () => {
        const token = localStorage.getItem("token"); // Recupera o token do localStorage
        console.log("Token no LocalStorage:", token); // Exibe o token no console para depuração

        // Se o token não existe ou está expirado, redireciona para login
        if (!token) {
            alert("A sua sessão expirou ou não foi encontrada. Por favor, faça login novamente.");
            localStorage.removeItem("token"); // Limpa o token expirado
            // Não redireciona mais para o login se a pessoa não estiver logada
            return false; // Retorna falso caso o token não seja válido
        }

        return true; // Token válido
    };

    useEffect(() => {
        // Verifica se o token está presente e válido (mas não impedimos o envio se não houver token)
        const tokenIsValid = verifyToken();
        // Não fazemos nada com o cliente logado neste caso, pois qualquer pessoa pode agendar
    }, [navigate]);

    // Função para enviar os dados do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Podemos enviar o ID como vazio, ou um valor como "guest" se a pessoa não estiver logada
        const clienteId = ""; // Não será mais necessário enviar um cliente ID autenticado

        // Verifique se todos os campos obrigatórios estão preenchidos
        const requiredFields = ['data', 'hora', 'servico'];
        const missing = requiredFields.filter(field => !formData[field]);

        if (missing.length > 0) {
            // Exibe os campos faltantes em um alerta
            alert("Por favor, preencha os seguintes campos: " + missing.join(", "));
            return;
        }

        try {
            // Envia os dados para o backend (Django)
            const response = await fetch("https://api2.nwayami.com/api/agendamentos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Usando o nome correto da chave no localStorage
                },
                body: JSON.stringify({
                    cliente: clienteId, // Não envia o ID do cliente
                    profissional: formData.profissional || null, // Profissional pode ser nulo
                    servico: formData.servico,
                    data: formData.data,
                    hora: formData.hora,
                    observacoes: formData.observacoes || "", // Pode ser vazio, mas nunca null
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Agendamento realizado com sucesso!");
                // Limpa os campos após o envio
                setFormData({
                    nome: '',
                    telefone: '',
                    servico: '',
                    data: '',
                    hora: '',
                    observacoes: '',
                    profissional: '',  // Isso pode ser selecionado ou nulo
                });
            } else {
                // Caso haja erro no envio
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

            {/* Header */}
            <Header />

            {/* Banner */}
            <section className="banner agendar">
                <div className="content">
                    <h3>Agende a Sua Sessão</h3>
                    <p>Escolha o serviço, selecione a data e garanta o seu atendimento com nossos profissionais.</p>
                </div>
            </section>

            {/* Agendar */}
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
                                {/* Adicione os serviços aqui */}
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

            {/* Footer */}
            <Footer />
        </>
    );
}

