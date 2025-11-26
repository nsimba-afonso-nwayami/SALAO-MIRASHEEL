import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/services-hair.css";
import ServicoDesfriso from "../assets/images/service-hair-desfriso.jpg";

export default function ServiceHair() {
  return (
    <>
      <title>Cabeleireiro | Salão Mirashell</title>

      {/*Header*/}
      <Header />

      {/*Banner*/}
      <section className="banner banner-hair">
        <div className="content">
          <h3>Cabeleireiro</h3>
          <p>Transforme o Seu Visual com Estilo e Confiança</p>
          <p>Cuidado profissional, técnicas modernas e resultados que valorizam a sua beleza.</p>
        </div>
      </section>

      {/*service*/}
      <section className="service">
        <a href="/agendar" className="btn cta-button">Agende Sua sessão</a>

        <div className="box-container">

          {/* Tranças */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Tranças</h2>
              <p>Manutenção: 8.000 Kz</p>
              <p>Tranças Grossas: 20.000 Kz</p>
              <p>Tranças Médias: 25.000 Kz</p>
              <p>Tranças Finas: 30.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

          {/* Croche Juba */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Croche Juba</h2>
              <p>Croche Juba: 25.000 Kz</p>
              <p>Tranças Mãos Finas: 28.000 Kz</p>
              <p>Tranças Mãos Finas: 18.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

          {/* Todo Tipo de Apanhado */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Todo Tipo de Apanhado</h2>
              <p>Coque: 25.000 Kz</p>
              <p>Pochinho: 15.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

          {/* Desfriso e Afro */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Desfriso e Afro</h2>
              <p>Cabelo Curto: 20.000 Kz</p>
              <p>Cabelo Pescoso: 25.000 Kz</p>
              <p>Cabelo Médio (Ombro): 30.000 Kz</p>
              <p>Cabelo Médio (Meia-Costa): 35.000 Kz</p>
              <p>Cabelo Comprido (Cintura): 45.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

          {/* Hidratação e Reconstrução */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Hidratação e Reconstrução (Cabelo Crespo)</h2>
              <p>Cabelo Curto: 15.000 Kz</p>
              <p>Cabelo Médio: 20.000 Kz</p>
              <p>Cabelo Comprido: 25.000 Kz</p>
              <p>Extra Longo: 30.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

          {/* Viradas Americanas */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Viradas Americanas</h2>
              <p>Grossas: 15.000 Kz</p>
              <p>Médias: 20.000 Kz</p>
              <p>Finas: 25.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

          {/* Mise e Brushing */}
          <div className="box">
            <div class="image">
                <img src={ServicoDesfriso} alt="Desfriso" />
            </div>
            <div className="content">
              <h2>Mise e Brushing</h2>
              <p>Cabelo Curto Nuca: 5.000 Kz</p>
              <p>Cabelo Médio (Pescoço): 6.000 Kz</p>
              <p>Cabelo Médio (Ombro): 8.000 Kz</p>
              <p>Cabelo Médio (Baixo-Ombro): 10.000 Kz</p>
              <p>Cabelo Comprido (Meia-Costa): 12.000 Kz</p>
              <p>Extra Longo: 15.000 Kz</p>
              <a href="/agendar" className="btn">Agenda Agora</a>
            </div>
          </div>

        </div>
      </section>

      {/*Footer*/}
      <Footer />
    </>
  )
}
