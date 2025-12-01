import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
                    <Link to="tel:923698462" className="links"><i className="fas fa-phone"></i> +244 923698462</Link>
                    <Link to="mailto:geral@mirashell.com" className="links"><i className="fas fa-envelope"></i> geral@mirashell.com</Link>
                    <Link to="/#mapa" className="links"><i className="fas fa-map-marker-alt"></i> Kilamba, T22 8° andar Porta 81</Link>
                </div>

                <div className="box">
                    <h3>Links Rápidos</h3>
                    <Link to="/" className="links"><i className="fas fa-arrow-right"></i> Home</Link>
                    <HashLink smooth to="/#sobre" className="links"><i className="fas fa-arrow-right"></i> Sobre</HashLink>
                    <HashLink smooth to="/#servicos" className="links"><i className="fas fa-arrow-right"></i> Serviços</HashLink>
                    <Link to="/agendar" className="links"><i className="fas fa-arrow-right"></i> Agendar</Link>
                </div>
            </div>
            <div className="credit">&copy; {new Date().getFullYear()} Salão Mirashell | Todos os direitos reservados!</div>
        </footer>
    )
}