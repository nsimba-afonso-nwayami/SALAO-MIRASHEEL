import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ServiceHair from "../pages/ServiceHair";
import ServicePerucas from "../pages/ServicePerucas";
import ServiceTrancas from "../pages/ServiceTrancas";
import ServiceEstetica from "../pages/ServiceEstetica";
import Agendar from "../pages/Agendar";
import MeusAgendamentos from "../pages/Meuspedidos";
import Loja from "../pages/Loja";
import Encomendar from "../pages/Encomendar";

import Login from "../auth/Login";
import CadastrarSe from "../auth/CadastrarSe";
import RecuperarSenha from "../auth/RecuperarSenha";

import Agendamentos from "../pages/Agendamentos";
import Servicos from "../pages/Servicos.jsx";
import Produtos from "../pages/Produtos.jsx";
import VisitasSite from "../pages/VisitasSite";

import NotFound from "../pages/NotFound";
import ScrollToTop from "../pages/ScrollToTop";
import Header from "../components/header/Header";

export default function AppRoutes() {
    return (
      <>
      <ScrollToTop/>
      <Header/>
        <Routes>
        
            {/* Site */}
            <Route path="/" element={<Home />} />
            <Route path="/cabeleireiro" element={<ServiceHair />} />
            <Route path="/service-perucas" element={<ServicePerucas />} />
            <Route path="/service-trancas" element={<ServiceTrancas />} />
            <Route path="/service-estetica" element={<ServiceEstetica />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/loja/encomendar" element={<Encomendar />} />
            <Route path="/Contador" element={<MeusAgendamentos />} />

            {/* Loja */}
            <Route path="/loja" element={<Loja />} />

            {/* Login */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/cadastrar-se" element={<CadastrarSe />} />
            <Route path="/auth/recuperar-senha" element={<RecuperarSenha />} />

            {/* Admin */}
            <Route path="/admin/agendamentos" element={<Agendamentos />} />
            <Route path="/admin/servicos" element={<Servicos />} />
            <Route path="/admin/produtos" element={<Produtos />} />
            <Route path="/admin/visitas-site" element={<VisitasSite />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    );
}
