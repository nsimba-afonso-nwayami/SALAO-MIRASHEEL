import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <header className="header">
      <Link to="/" className="logo">Salão Mirashell</Link>

      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        <div
          id="close-navbar"
          className="fas fa-times"
          onClick={() => setMenuOpen(false)}
        ></div>

        <Link to="/">Home</Link>
        <a href="/#sobre">Sobre</a>
        <a href="/#servicos">Serviços</a>
        <a href="/#galeria">Galeria</a>
        <Link to="/agendar">Agendar</Link>
        <a href="/#fale-conosco">Fale Conosco</a>

        {loggedIn && <Link to="/Contador">Meus Agendamentos</Link>}
        {isAdmin && <Link to="/admin/agendamentos">Ver Agendamentos</Link>}
      </nav>

      <div className="icons">
        <Link to="/loja" className="link fas fa-store"></Link>
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
