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
        // Dados do cliente
        nome: "",
        telefone: "",
        morada: "",

        // Dados do produto
        produto_nome: produto?.nome || "",
        descricao: produto?.descricao || "",
        preco: produto?.preco || 0,
        quantidade: 1,
    });

    const total = formData.quantidade * formData.preco;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Encomenda enviada:", formData);

        alert("Encomenda enviada com sucesso!");
    };

    const enviarWhatsApp = () => {
        const mensagem = `
            *NOVA ENCOMENDA - SALÃO MIRASHELL*  

            *Cliente:*  
            • Nome: ${formData.nome}  
            • Telefone: ${formData.telefone}  
            • Morada: ${formData.morada}  

            *Produto:*  
            • Nome: ${formData.produto_nome}  
            • Descrição: ${formData.descricao}  
            • Preço: ${formData.preco} Kz  
            • Quantidade: ${formData.quantidade}  
            • TOTAL: ${total} Kz  

            Por favor, confirmar a disponibilidade.
        `;

        const numero = "244923698462"; //
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
    };

    return (
        <>
            <title>Encomendar | Salão Mirashell</title>

            <Header />

            <section className="banner agendar">
                <div className="content">
                    <h3>Faça a sua encomenda</h3>
                    <p>Preencha os seus dados e confirme a sua encomenda.</p>
                </div>
            </section>

            <section className="visit" id="agendamento">
                <h1 className="heading">Detalhes da Encomenda</h1>

                <div className="row">
                    <form onSubmit={handleSubmit}>
                        
                        <h3>Dados do Cliente</h3>

                        <div className="inputBox">
                            <input 
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input 
                                type="tel"
                                name="telefone"
                                placeholder="Seu telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input 
                                type="text"
                                name="morada"
                                placeholder="Sua morada"
                                value={formData.morada}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <h3>Dados do Produto</h3>

                        <div className="inputBox">
                            <input 
                                type="text"
                                value={formData.produto_nome}
                                readOnly
                            />
                        </div>

                        <div className="inputBox">
                            <textarea
                                value={formData.descricao}
                                readOnly
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="inputBox">
                            <input 
                                type="text"
                                value={`Preço: ${formData.preco} Kz`}
                                readOnly
                            />
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
                            <input 
                                type="text"
                                value={`Total: ${total} Kz`}
                                readOnly
                            />
                        </div>

                        <button type="submit" className="btn">
                            Confirmar Encomenda
                        </button>

                        {/* Botão WhatsApp */}
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
