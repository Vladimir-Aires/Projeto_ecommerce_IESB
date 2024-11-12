"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaSearch, FaTrash } from "react-icons/fa";

export default function FuncionariosPage() {
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState();
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

    const categorias = [
        "Periféricos para pc",
        "Acessórios para console",
        "Acessórios para celular",
        "Aparelhos celular",
        "Relógios",
        "Fones de Ouvido",
        "Produtos diversos",
    ];

    function aplicarFiltro() {
        if (categoriasSelecionadas.length > 0) {
            const filtrado = produtos.filter((prod) =>
                categoriasSelecionadas.includes(prod.categoria)
            );
            setProdutosFiltrados(filtrado);
        } else {
            setProdutosFiltrados(produtos); // Exibe todos os produtos se nenhuma categoria for selecionada
        }
    }

    function handleCategoria(evento) {
        const { value, checked } = evento.target;
        setCategoriasSelecionadas((catAnteriores) =>
            checked
                ? [...catAnteriores, value]
                : catAnteriores.filter((cat) => cat !== value)
        );
    }

    function tirarFiltro() {
        setCategoriasSelecionadas([]);
        setProdutosFiltrados(produtos);
    }

    function excluir(prod) {
        if (window.confirm(`Realmente deseja excluir o produto?`)) {
            const listaAtualizada = produtos.filter(
                (item) => item.id !== prod.id
            );

            localStorage.setItem("produtos", JSON.stringify(listaAtualizada));
            setProdutos(listaAtualizada);
            alert("Produto excluído com sucesso!");
        }
    }

    useEffect(() => {
        const produtosLS = JSON.parse(localStorage.getItem("produtos")) || [];

        setProdutos(produtosLS);
        console.log(produtosLS);
    }, []);

    return (
        <Pagina titulo={"Produtos"}>
            <div className="text-end mb-2">
                <Button href="/produtos/form">
                    <FaPlusCircle /> Novo
                </Button>
            </div>

            <Row>
                <Col md={2}>
                    <div
                        style={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            padding: "4px",
                        }}
                    >
                        <Form>
                            {categorias.map((categoria, index) => (
                                <small>
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        value={categoria}
                                        label={categoria}
                                        checked={categoriasSelecionadas.includes(
                                            categoria
                                        )}
                                        onChange={handleCategoria}
                                    />
                                </small>
                            ))}
                        </Form>
                        <Form.Group className="text-center">
                            <Button
                                variant="danger"
                                onClick={aplicarFiltro}
                                className="m-2"
                            >
                                Filtrar
                            </Button>
                            <Button variant="secondary" onClick={tirarFiltro}>
                                Limpar Filtro
                            </Button>
                        </Form.Group>
                    </div>
                </Col>

                <Col>
                    <Row xs={1} md={3} className="g-2">
                        {produtosFiltrados?.map((produto) => (
                            <Col key={produto.id}>
                                <Card className="bg-dark text-light h-100">
                                    <Card.Img
                                        variant="top"
                                        src={produto.foto}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {produto.tipo.toUpperCase()}
                                        </Card.Title>
                                        <Card.Text>
                                            <p>
                                                {produto.marca.toUpperCase()}-
                                                {produto.modelo.toUpperCase()}
                                            </p>
                                            <h1 className="display-5">
                                                R${" "}
                                                {produto.valorUnitario.toFixed(
                                                    2
                                                )}
                                            </h1>
                                            <sup>
                                                Quantiade disponível:{" "}
                                                {produto.quantidade}
                                            </sup>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-center">
                                        <Button
                                            className="m-2"
                                            href={`/produtos/form?id=${produto.id}`}
                                        >
                                            Mais Detalhes <FaSearch />{" "}
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => excluir(produto)}
                                        >
                                            {" "}
                                            Excluir <FaTrash />{" "}
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Pagina>
    );
}
