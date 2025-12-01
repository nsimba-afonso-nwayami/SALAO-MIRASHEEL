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
        nome_completo: "",
        telefone: "",
        email: "",
        endereco_completo: "",
        ponto_referencia: "",
        cidade: "",
        provincia: "",
        metodo_pagamento: "contra entrega",

        // Dados do produto
        produto_nome: produto?.nome || "",
        descricao: produto?.descricao || "",
        preco: produto?.preco || 0,
        quantidade: 1,
    });

    const [comprovativo, setComprovativo] = useState(null);
    const total = formData.quantidade * formData.preco;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Enviar pedido via API (agora com FormData)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();

        formPayload.append("nome_completo", formData.nome_completo);
        formPayload.append("telefone", formData.telefone);
        formPayload.append("email", formData.email);
        formPayload.append("endereco_completo", formData.endereco_completo);
        formPayload.append("ponto_referencia", formData.ponto_referencia);
        formPayload.append("cidade", formData.cidade);
        formPayload.append("provincia", formData.provincia);
        formPayload.append("metodo_pagamento", formData.metodo_pagamento);
        formPayload.append("status", "pendente");

        // Enviar comprovativo se existir
        if (comprovativo) {
            formPayload.append("comprovativo_pagamento", comprovativo);
        }

        // Dados do produto enviados como objeto dentro do FormData
        formPayload.append("produto", JSON.stringify({
            nome: formData.produto_nome,
            descricao: formData.descricao,
            preco: formData.preco,
            quantidade: formData.quantidade,
            total: total
        }));

        try {
            const response = await fetch("https://api2.nwayami.com/api/pedidos/", {
                method: "POST",
                body: formPayload // IMPORTANTE: sem headers
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

    // Enviar pedido via WhatsApp
    const enviarWhatsApp = () => {
        const mensagem = `
            *NOVA ENCOMENDA – SALÃO MIRASHELL*

            *Cliente:*  
            • Nome: ${formData.nome_completo}  
            • Telefone: ${formData.telefone}  
            • Email: ${formData.email}
            • Cidade: ${formData.cidade}  
            • Província: ${formData.provincia}  
            • Morada: ${formData.endereco_completo}  
            • Referência: ${formData.ponto_referencia}  

            *Produto:*  
            • ${formData.produto_nome}  
            • ${formData.descricao}  
            • Preço: ${formData.preco} Kz  
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
                                name="nome_completo"
                                placeholder="Seu nome completo"
                                value={formData.nome_completo}
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
                                name="endereco_completo"
                                placeholder="Endereço completo"
                                value={formData.endereco_completo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="ponto_referencia"
                                placeholder="Ponto de referência"
                                value={formData.ponto_referencia}
                                onChange={handleChange}
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

                        {/* MÉTODO DE PAGAMENTO */}
                        <div className="inputBox">
                            <select
                                name="metodo_pagamento"
                                value={formData.metodo_pagamento}
                                onChange={handleChange}
                                required
                            >
                                <option value="transferencia">Transferência Bancária</option>
                                <option value="cartão">Pagamento por Cartão</option>
                                <option value="contra entrega">Contra Entrega</option>
                            </select>
                        </div>

                        {/* MOSTRAR COMPROVATIVO SOMENTE PARA CARTÃO OU TRANSFERÊNCIA */}
                        {(formData.metodo_pagamento === "cartão" ||
                            formData.metodo_pagamento === "transferencia") && (
                            <div className="inputBox">
                                <label>Enviar comprovativo de pagamento</label>
                                <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => setComprovativo(e.target.files[0])}
                                    required
                                />
                            </div>
                        )}

                        <h3>Dados do Produto</h3>

                        <div className="inputBox">
                            <input type="text" value={formData.produto_nome} readOnly />
                        </div>

                        <div className="inputBox">
                            <textarea value={formData.descricao} readOnly rows="4"></textarea>
                        </div>

                        <div className="inputBox">
                            <input type="text" value={`Preço: ${formData.preco} Kz`} readOnly />
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
