import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import ServiceHair from "../pages/ServiceHair";
import ServicePerucas from "../pages/ServicePerucas";
import ServiceTrancas from "../pages/ServiceTrancas";
import ServiceEstetica from "../pages/ServiceEstetica";
import Agendamentos from "../pages/Agendamentos";

import Agendar from "../pages/Agendar";
import MeusAgendamentos from "../pages/Meuspedidos";
import Loja from "../pages/Loja";

import Login from "../auth/Login";
import CadastrarSe from "../auth/CadastrarSe";
import RecuperarSenha from "../auth/RecuperarSenha";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Site */}
            <Route path="/" element={<Home />} />
            <Route path="/cabeleireiro" element={<ServiceHair />} />
            <Route path="/service-perucas" element={<ServicePerucas />} />
            <Route path="/service-trancas" element={<ServiceTrancas />} />
            <Route path="/service-estetica" element={<ServiceEstetica />} />
            <Route path="/agendar" element={<Agendar />} />
            <Route path="/Contador" element={<MeusAgendamentos />} />

            {/* Loja */}
            <Route path="/loja" element={<Loja />} />

            {/* Login */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/cadastrar-se" element={<CadastrarSe />} />
            <Route path="/auth/recuperar-senha" element={<RecuperarSenha />} />
            <Route path="/admin/agendamentos" element={<Agendamentos />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
