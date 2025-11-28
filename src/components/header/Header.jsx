import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <header
      className="header"
      style={{
        height: "80px",  // Altura fixa
      }}
    >

      {/* LOGO EM CÍRCULO */}
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
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </Link>

      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        <div
          id="close-navbar"
          className="fas fa-times"
          onClick={() => setMenuOpen(false)}
        ></div>

        <Link to="/">Home</Link>
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#galeria">Galeria</a>
        <Link to="/agendar">Agendar</Link>
        <a href="#fale-conosco">Fale Conosco</a>

        {loggedIn && <Link to="/Contador">Meus Agendamentos</Link>}
        {isAdmin && <Link to="/admin/agendamentos">Ver Agendamentos</Link>}
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
