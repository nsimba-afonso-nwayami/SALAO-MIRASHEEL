import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { useForm } from "react-hook-form";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import mirachelVideo from "../assets/video/mirachel_full.mp4";
import AboutImg from "../assets/images/about.jpg";
import AboutIconImg1 from "../assets/images/about-icon-1.png";
import AboutIconImg2 from "../assets/images/about-icon-2.png";
import AboutIconImg3 from "../assets/images/about-icon-3.png";
import ServiceHair from "../assets/images/service-hair.jpg";
import ServicoPeruca from "../assets/images/service-perucas.jpg";
import ServicoTrancas from "../assets/images/service-trancas.jpg";
import ServicoEstetica from "../assets/images/service-estetica.jpg";;
import GaleriaImg1 from "../assets/images/galeria1.jpg";
import GaleriaImg2 from "../assets/images/galeria2.jpg";
import GaleriaImg3 from "../assets/images/galeria3.jpg";
import GaleriaImg4 from "../assets/images/galeria4.jpg";
import GaleriaImg5 from "../assets/images/galeria5.jpg";
import GaleriaImg6 from "../assets/images/galeria6.jpg";

import LightGallery from "lightgallery/react";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

// CSS
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

export default function Home() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onChange" // valida em tempo real
    });

    const onSubmit = (data) => {
        //console.log("Dados enviados:", data);
    };

    return (
        <>
            <title>Salão Mirashell</title>

            {/*Header*/}
            

            {/*Home*/}
            <section className="home" id="home">
                <div className="content">
                    <h1>Beleza que Inspira Confiança</h1>
                    <p>Tratamentos exclusivos para realçar o melhor de você, todos os dias.</p>
                    <Link to="/agendar" className="btn">Agendar Agora</Link>
                </div>

                <div className="video-container">
                    <video src={mirachelVideo} id="video" loop autoPlay muted type="video/mp4"></video>
                </div>
            </section>

            {/*About*/}
            <section className="about" id="sobre">
                <h1 className="heading">Sobre nós</h1>
                <div className="row">
                    <div className="image">
                        <img src={AboutImg} alt="Sobre nós" />
                    </div>
                    <div className="content">
                        <h3 className="title">Somos um salão elegante</h3>
                        <p>
                            Somos um salão dedicado a realçar a sua beleza com serviços profissionais, 
                            técnicas modernas e um atendimento focado em resultados naturais, seguros e 
                            qualidade. Aqui, cada detalhe importa para que você se sinta confiante e 
                            valorizada..
                        </p>

                        <div className="icons-container">
                            <div className="icons">
                                <img src={AboutIconImg1} alt="Ferramentas Profissionais"/>
                                <h3>Ferramentas Profissionais</h3>
                            </div>
                            <div className="icons">
                                <img src={AboutIconImg2} alt="Equipamentos de Qualidade"/>
                                <h3>Equipamentos de Qualidade</h3>
                            </div>
                            <div className="icons">
                                <img src={AboutIconImg3} alt="Cabelo Desejado"/>
                                <h3>Cabelo Desejado</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services" id="servicos">
                <h1 className="heading">Nossos Serviços</h1>

                <div className="box-container">

                    <div className="box">
                        <div className="image">
                            <img src={ServiceHair} alt="" />
                        </div>
                        <div className="content">
                            <h3>Cabeleireiro</h3>
                            <Link to="/cabeleireiro" className="btn">Ver mais</Link>
                        </div>
                    </div>

                    <div className="box">
                        <div className="image">
                            <img src={ServicoPeruca} alt="" />
                        </div>
                        <div className="content">
                            <h3>Extensões e Perucas</h3>
                            <Link to="/service-perucas" className="btn">Ver mais</Link>
                        </div>
                    </div>

                    <div className="box">
                        <div className="image">
                            <img src={ServicoTrancas} alt="" />
                        </div>
                        <div className="content">
                            <h3>Tranças e Penteados</h3>
                            <Link to="/service-trancas" className="btn">Ver mais</Link>
                        </div>
                    </div>

                    <div className="box">
                        <div className="image">
                            <img src={ServicoEstetica} alt="" />
                        </div>
                        <div className="content">
                            <h3>Estética</h3>
                            <Link to="/service-estetica" className="btn">Ver mais</Link>
                        </div>
                    </div>

                </div>
            </section>


            {/*Galeria*/}
            <section className="gallery" id="galeria">
                <h1 className="heading">Nossa <span>Galeria</span></h1>
                <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                    elementClassNames="gallery-container"
                >
                    <a href={GaleriaImg1} className="box">
                        <img src={GaleriaImg1} alt="Galeria 1" />
                        <div className="icon"><i className="fas fa-plus"></i></div>
                    </a>

                    <a href={GaleriaImg2} className="box">
                        <img src={GaleriaImg2} alt="Galeria 2" />
                        <div className="icon"><i className="fas fa-plus"></i></div>
                    </a>

                    <a href={GaleriaImg3} className="box">
                        <img src={GaleriaImg3} alt="Galeria 3" />
                        <div className="icon"><i className="fas fa-plus"></i></div>
                    </a>

                    <a href={GaleriaImg4} className="box">
                        <img src={GaleriaImg4} alt="Galeria 4" />
                        <div className="icon"><i className="fas fa-plus"></i></div>
                    </a>

                    <a href={GaleriaImg5} className="box">
                        <img src={GaleriaImg5} alt="Galeria 5" />
                        <div className="icon"><i className="fas fa-plus"></i></div>
                    </a>

                    <a href={GaleriaImg6} className="box">
                        <img src={GaleriaImg6} alt="Galeria 6" />
                        <div className="icon"><i className="fas fa-plus"></i></div>
                    </a>
                </LightGallery>
            </section>

            {/*Agendar*/}
            <section className="visit" id="fale-conosco">
                <h1 className="heading">Fale Conosco</h1>

                <div className="row">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3>Preencha e Envie o Formulário</h3>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                {...register("nome", { required: true })}
                            />
                            {errors.nome && <span>Nome é obrigatório</span>}
                        </div>

                        <div className="inputBox">
                            <input
                                type="email"
                                name="email"
                                placeholder="exemplo@gmail.com"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span>Email é obrigatório</span>}
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                name="assunto"
                                placeholder="Seu assunto"
                                {...register("assunto", { required: true })}
                            />
                            {errors.assunto && <span>Assunto é obrigatório</span>}
                        </div>

                        <div className="inputBox">
                            <textarea
                                name="msg"
                                cols="10"
                                rows="30"
                                placeholder="Sua mensagem"
                                {...register("msg", { required: true })}
                            />
                            {errors.msg && <span>Mensagem é obrigatória</span>}
                        </div>

                        <button type="submit" name="enviar" className="btn">
                            Enviar Mensagem
                        </button>
                    </form>
                </div>
            </section>

            {/*Mapa*/}
            <section className="mapa" id="mapa">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15762.732180945357!2d13.257151589534864!3d-9.001284253434116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sKilamba%20T22!5e0!3m2!1spt-PT!2sao!4v1764325460882!5m2!1spt-PT!2sao"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>

            {/*Footer*/}
            <Footer />
        </>
    );
}