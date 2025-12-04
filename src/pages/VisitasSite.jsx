import { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../assets/css/style.css";
import "../assets/css/services.css";
import "../assets/css/agendar.css";

export default function VisitasSite() {

    return (
        <>
            <title>Visitas do Site | Salão Mirashell</title>

            

            <section className="banner agendar">
                <div className="content">
                    <h3>Visitantes do site</h3>
                    <p>Total de visitas: <strong>20.0000</strong></p>
                </div>
            </section>

            <Footer />
        </>
    );
}
