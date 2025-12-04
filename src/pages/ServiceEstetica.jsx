import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/services-estetica.css";
import ServicoEstetica from "../assets/images/service-estetica.jpg";
import ServicoRadio from "../assets/images/service-estetica-radio.jpg";
import ServicoDrenagem from "../assets/images/service-estetica-drenagem.jpg";
import ServicoHidro from "../assets/images/service-estetica-hidro.jpg";
import ServicoCorporal from "../assets/images/service-estetica-corporal.jpg";

export default function ServiceEstetica () {
    return (
        <>
            <title>Estética | Salão Mirashell</title>

            {/*Header*/}
            

            {/*Banner*/}
            <section className="banner banner-estetica">
                <div className="content">
                    <h3>Tratamentos Estéticos</h3>
                    <p>Realce sua beleza com técnicas modernas e resultados profissionais.</p>
                    <p>Cuidado especializado para corpo e rosto.</p>
                </div>
            </section>

            {/*service*/}
            <section className="service">

                <div className="box-container">

                    {/* Radiofrequência */}
                    <div className="box">
                        <div className="image">
                            <img src={ServicoRadio} alt="Radiofrequência" />
                        </div>
                        <div className="content">
                            <h2>Radiofrequência</h2>
                            <p>8.000 Kz</p>
                            <Link to="/agendar" className="btn">Agendar Agora</Link>
                            
                        </div>
                    </div>

                    {/* Drenagem Linfática Infantil */}
                    <div className="box">
                        <div className="image">
                            <img src={ServicoDrenagem} alt="Drenagem Linfática Infantil" />
                        </div>
                        <div className="content">
                            <h2>Drenagem Linfática Infantil</h2>
                            <p>20.000 Kz</p>
                            <Link to="/agendar" className="btn">Agendar Agora</Link>
                        </div>
                    </div>

                    {/* Hidrofacial */}
                    <div className="box">
                        <div className="image">
                            <img src={ServicoHidro} alt="Hidrofacial" />
                        </div>
                        <div className="content">
                            <h2>Hidrofacial</h2>
                            <p>25.000 Kz</p>
                            <Link to="/agendar" className="btn">Agendar Agora</Link>
                        </div>
                    </div>

                    {/* Corrente Russa */}
                    <div className="box">
                        <div className="image">
                            <img src={ServicoEstetica} alt="Corrente Russa" />
                        </div>
                        <div className="content">
                            <h2>Corrente Russa</h2>
                            <p>8.000 Kz</p>
                            <Link to="/agendar" className="btn">Agendar Agora</Link>
                        </div>
                    </div>

                    {/* Desintoxicação Corporal */}
                    <div className="box">
                        <div className="image">
                            <img src={ServicoCorporal} alt="Desintoxicação Corporal" />
                        </div>
                        <div className="content">
                            <h2>Desintoxicação Corporal</h2>
                            <p>25.000 Kz</p>
                            <Link to="/agendar" className="btn">Agendar Agora</Link>
                        </div>
                    </div>

                </div>
            </section>

            {/*Footer*/}
            <Footer />
        </>
    )
}
