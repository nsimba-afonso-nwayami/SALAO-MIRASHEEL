import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../assets/images/LOGO.png"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";

    if (token) {
      setLoggedIn(true);
      setIsAdmin(adminFlag);
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setIsAdmin(false);
    navigate("/auth/login");
  };

  // header do admin
  if (isAdmin) {
    return (
      <header className="header" style={{ height: "80px" }}>
        <Link to="/admin/agendamentos" className="logo">
          <div
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              border: "2px solid #d3d3d3",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Link>

        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <div
            id="close-navbar"
            className="fas fa-times"
            onClick={() => setMenuOpen(false)}
          ></div>

          <Link to="/admin/agendamentos">Gerenciar Agendamentos</Link>
          <Link to="/admin/servicos">Serviços</Link>
          <Link to="/admin/produtos">Produtos</Link>
          <Link to="/admin/usuarios">Cadastrar Usuários</Link>
          <Link to="/admin/relatorios">Relatórios</Link>
          <Link to="/admin/visitas-site">Visitas</Link>
        </nav>

        <div className="icons">
          <button
            onClick={handleLogout}
            className="link fas fa-sign-out-alt"
            style={{ border: "none", background: "none" }}
          ></button>

          <div
            id="menu-btn"
            className="fas fa-bars"
            onClick={() => setMenuOpen(true)}
          ></div>
        </div>
      </header>
    );
  }

  // header do usuário normal
  return (
    <header className="header" style={{ height: "80px" }}>
      <Link to="/" className="logo">
        <div
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            border: "2px solid #d3d3d3",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Link>

      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        <div
          id="close-navbar"
          className="fas fa-times"
          onClick={() => setMenuOpen(false)}
        ></div>
        
        <Link to="/">Inicio</Link>
        <HashLink smooth to="/#sobre">Sobre</HashLink>
        <HashLink smooth to="/#servicos">Serviços</HashLink>
        <HashLink smooth to="/#galeria">Galeria</HashLink>
        <Link to="/agendar">Agendar</Link>
        <Link to="/loja">Loja</Link>
        <HashLink smooth to="/#fale-conosco">Fale Connosco</HashLink>
      </nav>

      <div className="icons">
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="link fas fa-sign-out-alt"
            style={{ border: "none", background: "none" }}
          ></button>
        ) : (
          <Link to="/auth/login" className="link fas fa-user"></Link>
        )}

        <div
          id="menu-btn"
          className="fas fa-bars"
          onClick={() => setMenuOpen(true)}
        ></div>
      </div>
    </header>
  );
}
