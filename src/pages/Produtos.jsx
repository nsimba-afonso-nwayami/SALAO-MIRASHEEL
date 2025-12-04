import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/agendamentos-table.css";
import toast from "react-hot-toast";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const token = localStorage.getItem("token");

  const limiteProdutos = 10; // Limite de registros

  // Buscar produtos
  const fetchProdutos = async () => {
    setLoading(true);
    setErro("");

    try {
      if (!token) throw new Error("Usuário não autenticado.");

      const response = await fetch("https://api2.nwayami.com/api/produtos/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.detail || "Erro ao carregar produtos.");

      const produtosFormatados = data.map((p) => ({
        id: p.id,
        nome: p.nome || "Sem nome",
        preco: p.preco !== null ? p.preco : "-",
        categoria: p.categoria || "-",
        descricao: p.descricao || "-",
        estoque: p.estoque !== null ? p.estoque : "-",
      }));

      setProdutos(produtosFormatados);
      toast.success("Produtos carregados!");
    } catch (err) {
      setErro(err.message);
      toast.error(err.message || "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Filtrar produtos pelo nome
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Deletar produto
  const deletarProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      const response = await fetch(`https://api2.nwayami.com/api/produtos/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao deletar produto.");

      setProdutos((prev) => prev.filter((p) => p.id !== id));
      toast.success("Produto deletado com sucesso!");
    } catch (err) {
      toast.error("Erro ao deletar produto: " + err.message);
    }
  };

  return (
    <>
      <title>Produtos | Dashboard</title>
      <section className="services">
        <h1 className="heading">Produtos Cadastrados</h1>

        {/* Section de busca */}
        <section className="section-search">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Busque aqui..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button type="submit" className="fas fa-search" title="Pesquisar"></button>
          </form>
        </section>

        {loading && <p className="p-loading">Carregando produtos...</p>}
        {erro && <p className="p-error">{erro}</p>}
        {!loading && !erro && produtos.length === 0 && (
          <p className="p-agenda">Nenhum produto encontrado.</p>
        )}

        {produtosFiltrados.length > 0 && (
          <div className="tabela-wrapper">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.slice(0, limiteProdutos).map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td>{p.preco}</td>
                    <td>{p.categoria}</td>
                    <td>{p.estoque}</td>
                    <td className="acoes">
                      <button
                        className="button confirmar"
                        onClick={() => toast("Funcionalidade de edição não implementada.")}
                      >
                        Editar
                      </button>
                      <button
                        className="button cancelar"
                        onClick={() => deletarProduto(p.id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !erro && produtosFiltrados.length === 0 && (
          <p className="p-agenda">Nenhum produto encontrado para esta busca.</p>
        )}
      </section>

      <Footer />
    </>
  );
}
