import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css"; // Caso precise de algum estilo extra
import "../assets/css/loja.css";

export default function Loja() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        // Requisição para o backend (Django)
        fetch('https://api2.nwayami.com/api/produtos/')
            .then(response => response.json())
            .then(data => setProdutos(data))
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }, []);

    // Função para formatar a URL da imagem
    const formatImageUrl = (url) => {
        if (!url) return ""; // Caso não haja imagem
        return url.replace("/media/", "/api/media/"); // Formata a URL da imagem
    };

    return (
        <>
            <title>Loja | Salão Mirashell</title>

            {/*Header*/}
            <Header />

            {/*Produtos*/}
            <section className="loja">
                <h2 className="heading">Nossos Produtos</h2>
                <div className="box-container">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                        <div className="box" key={produto.id}>
                            {/* Imagem */}
                            <div className="image">
                            <img
                                src={formatImageUrl(produto.imagem) || "/path/to/default-image.jpg"}
                                alt={produto.descricao}
                            />
                            </div>

                            {/* Conteúdo */}
                            <div className="content">
                                <h2>{produto.nome}</h2>
                                <p>{produto.descricao}</p>
                                <p>Estoque: <strong> {produto.estoque}</strong></p>
                                <p>Preço: <strong>Kz {produto.preco}</strong></p>

                                {/* Botão */}
                                <Link 
                                    to="/loja/encomendar"
                                    state={{ produto }}   // <-- Enviando dados do produto
                                    className="btn"
                                >
                                    Encomendar Agora
                                </Link>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>Carregando produtos...</p>
                    )}
                </div>
            </section>

            {/*Footer*/}
            <Footer />
        </>
    );
}
