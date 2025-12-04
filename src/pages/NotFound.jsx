import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function NotFound () {
    return (
        <>
            <title>Página não encontrada | Salão Mirashell</title>

            {/*Header*/}
    
            <section className="erro mt-6 d-flex">
                <div className="content">
                    <h1>404</h1>
                    <p>Ops! A página solicitada não foi encontrada ou não existe.</p>
                    <div className="d-flex">
                        <Link to="/" className="btn">Voltar Para Home</Link>
                    </div>
                </div>
            </section>

            {/*Footer*/}
            <Footer />
        </>
    )
}