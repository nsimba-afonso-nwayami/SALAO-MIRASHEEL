import { Link } from "react-router-dom";

export default function Footer () {
    return (
        <footer className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>Salão Mirashell</h3>
                    <p>Cuide da sua beleza, eleve a sua auto estima e viva melhor!</p>
                    <div className="share">
                    <Link to="#" target="_blank" className="fab fa-facebook-f" rel="noopener noreferrer"></Link>
                    <Link to="#" target="_blank" className="fab fa-instagram" rel="noopener noreferrer"></Link>
                    <Link to="#" target="_blank" className="fab fa-twitter" rel="noopener noreferrer"></Link>
                    <Link to="#" target="_blank" className="fab fa-linkedin" rel="noopener noreferrer"></Link>
                    </div>
                </div>

                <div className="box">
                    <h3>Contato de Informação</h3>
                    <Link to="tel:927108033" className="links"><i className="fas fa-phone"></i> +244 927108033</Link>
                    <Link to="mailto:salaomicharel@gmail.com" className="links"><i className="fas fa-envelope"></i> salaomicharel@gmail.com</Link>
                    <Link to="/#mapa" className="links"><i className="fas fa-map-marker-alt"></i> Luanda</Link>
                </div>

                <div className="box">
                    <h3>Links Rápidos</h3>
                    <Link to="/" className="links"><i className="fas fa-arrow-right"></i> Home</Link>
                    <Link to="/#sobre" className="links"><i className="fas fa-arrow-right"></i> Sobre</Link>
                    <Link to="/#servicos" className="links"><i className="fas fa-arrow-right"></i> Serviços</Link>
                    <Link to="/#agendar" className="links"><i className="fas fa-arrow-right"></i> Agendar</Link>
                </div>
            </div>
            <div className="credit">&copy; {new Date().getFullYear()} Salão Mirashell | Todos os direitos reservados!</div>
        </footer>
    )
}