import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/services-trancas.css";
import ServicoLimpeza from "../assets/images/service-trancas-limpeza.jpg";
import ServicoMaquiagem from "../assets/images/service-trancas-maquiagem.jpg";
import ServicoTrancas from "../assets/images/service-trancas.jpg";
import { Link } from "react-router-dom";

export default function ServiceTrancas() {
  return (
    <>
      <title>Estética e Beleza | Salão Mirashell</title>

      {/*Header*/}
      <Header />

      {/*Banner*/}
      <section className="banner banner-trancas">
        <div className="content">
          <h3>Tranças e Penteados</h3>
          <p>Transforme o Seu Visual com Estilo e Confiança</p>
          <p>Cuidado profissional, técnicas modernas e resultados que valorizam a sua beleza.</p>
        </div>
      </section>

      {/*service*/}
      <section className="service">

        <div className="box-container">

          {/* Limpeza Facial */}
          <div className="box">
            <div class="image">
                <img src={ServicoLimpeza} alt="Limpeza Facial" />
            </div>
            <div className="content">
              <h2>Limpeza Facial</h2>
              <p>Hidro Facial: 25.000 Kz</p>
              <p>Limpeza Normal: 15.000 Kz</p>
              <p>Limpeza Profunda: 20.000 Kz</p>
              <p>Microblading: 35.000 Kz</p>
              <p>Micro Pigmentação: 30.000 Kz</p>
              <Link to="/agendar" className="btn">Agendar Agora</Link>
            </div>
          </div>

          {/* Maquiagem */}
          <div className="box">
            <div class="image">
                <img src={ServicoMaquiagem} alt="Maquiagem" />
            </div>
            <div className="content">
              <h2>Maquiagem</h2>
              <p>Maquiagem de Noiva: 20.000 Kz</p>
              <p>Maquiagem Normal: 15.000 Kz</p>
              <p>Pintura de Henna: 3.000 Kz</p>
              <p>Aplicação de Cílios Normal: 10.000 Kz</p>
              <Link to="/agendar" className="btn">Agendar Agora</Link>
            </div>
          </div>

          {/* Cordoletes e Bobis */}
          <div className="box">
            <div class="image">
                <img src={ServicoTrancas} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Cordoletes e Bobis</h2>
              <p>Americano (Grossas): 15.000 Kz</p>
              <p>Americano (Médias): 20.000 Kz</p>
              <p>Americano (Finas): 25.000 Kz</p>
              <p>Bobi de Crianças (Grossas): 7.000 Kz</p>
              <p>Bobi de Crianças (Finas): 10.000 Kz</p>
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
