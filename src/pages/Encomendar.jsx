import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/agendar.css";

export default function Encomendar() {

    const { state } = useLocation();
    const produto = state?.produto || null;

    const [formData, setFormData] = useState({
        nome_cliente: "",
        telefone: "",
        email: "",
        endereco: "",
        cidade: "",
        provincia: "",
        quantidade: 1,
    });

    const total = produto ? formData.quantidade * produto.preco : 0;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Enviar pedido para API
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!produto) {
            alert("Erro: Nenhum produto encontrado!");
            return;
        }

        const payload = {
            nome_cliente: formData.nome_cliente,
            telefone: formData.telefone,
            email: formData.email,
            endereco: formData.endereco,
            cidade: formData.cidade,
            provincia: formData.provincia,
            status: "pendente",

            itens: [
                {
                    produto: produto.id,              // <-- SOMENTE O ID DO PRODUTO
                    quantidade: Number(formData.quantidade),
                    preco: produto.preco,
                    total: total
                }
            ]
        };

        try {
            const response = await fetch("https://api2.nwayami.com/api/encomendas/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Erro da API:", data);
                alert("Erro ao enviar pedido.");
                return;
            }

            alert("Pedido enviado com sucesso!");

        } catch (error) {
            console.error(error);
            alert("Erro ao enviar pedido. Tente novamente.");
        }
    };

    // Enviar pelo WhatsApp
    const enviarWhatsApp = () => {
        const mensagem = `
        *NOVA ENCOMENDA – Salão Mirashell*

        *Cliente:*  
        • Nome: ${formData.nome_cliente}  
        • Telefone: ${formData.telefone}  
        • Email: ${formData.email}
        • Cidade: ${formData.cidade}  
        • Província: ${formData.provincia}  
        • Morada: ${formData.endereco}  

        *Produto:*  
        • ${produto.nome}  
        • ${produto.descricao}  
        • Preço: ${produto.preco} Kz  
        • Quantidade: ${formData.quantidade}  

        *TOTAL:* ${total} Kz
        `;

        const numero = "244923698462";
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    };

    return (
        <>
            <title>Encomendar | Salão Mirashell</title>

            <Header />

            <section className="visit" id="agendamento">
                <h1 className="heading">Detalhes da Encomenda</h1>

                <div className="row">
                    <form onSubmit={handleSubmit}>

                        <h3>Dados do Cliente</h3>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="nome_cliente"
                                placeholder="Seu nome completo"
                                value={formData.nome_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="tel"
                                name="telefone"
                                placeholder="Telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
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
                            <input
                                type="text"
                                name="endereco"
                                placeholder="Endereço completo"
                                value={formData.endereco}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="cidade"
                                placeholder="Cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="provincia"
                                placeholder="Província"
                                value={formData.provincia}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <h3>Dados do Produto</h3>

                        <div className="inputBox">
                            <input type="text" value={produto.nome} readOnly />
                        </div>

                        <div className="inputBox">
                            <textarea value={produto.descricao} readOnly rows="4"></textarea>
                        </div>

                        <div className="inputBox">
                            <input type="text" value={`Preço: ${produto.preco} Kz`} readOnly />
                        </div>

                        <div className="inputBox">
                            <input
                                type="number"
                                name="quantidade"
                                min="1"
                                value={formData.quantidade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input type="text" value={`Total: ${total} Kz`} readOnly />
                        </div>

                        <button type="submit" className="btn">
                            Confirmar Encomenda
                        </button>

                        <button
                            type="button"
                            onClick={enviarWhatsApp}
                            className="btn"
                            style={{ background: "#25D366", marginTop: "10px" }}
                        >
                            Encomendar pelo WhatsApp
                        </button>

                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}
