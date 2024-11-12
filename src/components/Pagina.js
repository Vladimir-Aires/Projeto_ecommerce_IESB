"use client";

import { Container, Nav, Navbar } from "react-bootstrap";
import { FaHome } from "react-icons/fa";

export default function Pagina({ titulo, children }) {
    return (
        <>
            
            {/* Titulo */}

            <div className="bg-danger text-center text-white py-3">
                <h1 className="display-5">{titulo}</h1>
            </div>


            {/* barra navegação */}
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/"> <FaHome /> </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/fornecedores">Fornecedores</Nav.Link>
                        <Nav.Link href="/funcionarios">Funcionários</Nav.Link>
                        <Nav.Link href="/produtos">Produtos</Nav.Link>
                        <Nav.Link href="/pedidos">Pedidos</Nav.Link>
                        <Nav.Link href="/clientes">Clientes</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* conteúdo */}
            <Container className="min-vh-100 my-2 py-2">{children}</Container>
            {/* rodapé */}
            <div className="bg-secondary text-white text-end px-5 py-3">
                <p>woeivnerneriovrieriovneri</p>
            </div>
        </>
    );
}
