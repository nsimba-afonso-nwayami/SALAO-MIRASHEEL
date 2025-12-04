import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/services-perucas.css";
import ServicoPerucas from "../assets/images/service-perucas.jpg";
import ServicoTratamento from "../assets/images/service-perucas-tratamento.jpg";
import ServicoColoracao from "../assets/images/service-perucas-coloracao.jpg";
import ServicoAplicacao from "../assets/images/service-perucas-aplicacao.jpg";
import ServicoXoxo from "../assets/images/service-perucas-xoxo.jpg";
import { Link } from "react-router-dom";

export default function ServicePerucas() {
  return (
    <>
      <title>Extensões e Perucas | Salão Mirashell</title>

      {/*Header*/}
      

      {/*Banner*/}
      <section className="banner banner-perucas">
        <div className="content">
          <h3>Extensões e Perucas</h3>
          <p>Transforme o Seu Visual com Estilo e Confiança</p>
          <p>Cuidado profissional, técnicas modernas e resultados que valorizam a sua beleza.</p>
        </div>
      </section>

      {/*service*/}
      <section className="service">

        <div className="box-container">

          {/* Tratamento de Perucas */}
          <div className="box">
            <div class="image">
                <img src={ServicoTratamento} alt="Tratamento de Perucas" />
            </div>
            <div className="content">
              <h2>Tratamento de Perucas</h2>
              <p>Hidratação + Mise: 10.000 Kz</p>
              <p>Só Aplicação: 25.000 Kz</p>
              <p>Peruca Completa: 12.000 Kz</p>
              <p>Peruca Extra Longa: 15.000 Kz</p>
              <Link to="/agendar" className="btn">Agendar Agora</Link>
            </div>
          </div>

          {/* Coloração de Perucas */}
          <div className="box">
            <div class="image">
                <img src={ServicoColoracao} alt="Coloração de Perucas" />
            </div>
            <div className="content">
              <h2>Coloração de Perucas</h2>
              <p>Peruca Curta + Mise: 25.000 Kz</p>
              <p>Peruca Média + Mise: 30.000 Kz</p>
              <p>Peruca Completa: 45.000 Kz</p>
              <p>Peruca Extra Longa: 50.000 Kz</p>
              <p>Aplicação de Lace: 25.000 Kz</p>
              <Link to="/agendar" className="btn">Agendar Agora</Link>
            </div>
          </div>

          {/* Aplicação de Cabelo */}
          <div className="box">
            <div class="image">
                <img src={ServicoAplicacao} alt="Aplicação de Cabelo" />
            </div>
            <div className="content">
              <h2>Aplicação de Cabelo</h2>
              <p>Costura + Mise: 25.000 Kz</p>
              <p>Nó Italiano + Mise: 30.000 Kz</p>
              <p>Lace Frontal + Brushing: 25.000 Kz</p>
              <p>Preparação de Queratina: 60.000 Kz</p>
              <Link to="/agendar" className="btn">Agendar Agora</Link>
            </div>
          </div>

          {/* Tranças XOXO */}
          <div className="box">
            <div class="image">
                <img src={ServicoXoxo} alt="Tranças XOXO" />
            </div>
            <div className="content">
              <h2>Tranças XOXO</h2>
              <p>Curto: 15.000 Kz</p>
              <p>Médio: 20.000 Kz</p>
              <p>Comprido: 25.000 Kz</p>
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
