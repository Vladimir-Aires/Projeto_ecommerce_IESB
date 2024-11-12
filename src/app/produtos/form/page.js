"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { FaArrowLeft, FaBrush, FaCheck } from "react-icons/fa";

export default function ProdutosFormPage(props) {
    const roteamento = useRouter();

    const [Fornecedores, setFornecedores] = useState([]);

    const CatProd = [
        "Periféricos para pc",
        "Acessórios para console",
        "Acessórios para celular",
        "Aparelhos celular",
        "Relógios",
        "Fones de Ouvido",
        "Produtos diversos",
    ];

    // Para armazenar ou buscar dados no local storage
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    // Recuperar identificador para edições
    const id = props.searchParams.id;
    console.log(props.searchParams.id);

    // Busca no local storage o funcionário usando o id de parâmetro
    const produtoEditado = produtos.find((item) => item.id == id);
    console.log(produtoEditado);

    // Para salvar ou editar os dados do formulário
    function SalvarDados(dados) {
        produtoEditado
            ? (Object.assign(produtoEditado, dados),
              localStorage.setItem("produtos", JSON.stringify(produtos)),
              alert("Produto editado com sucesso!"))
            : ((dados.id = v4()),
              produtos.push(dados),
              localStorage.setItem("produtos", JSON.stringify(produtos)),
              alert("Produto cadastrado com sucesso!"));

        roteamento.push("/produtos");
    }

    const initialValues = {
        categoria: "",
        tipo: "",
        marca: "",
        modelo: "",
        quantidade: "",
        valorUnitario: "0,00",
        fornecedor: "",
        cor: "",
        descricao: "",
        foto:""
    };

    const validationSchema = Yup.object().shape({
        categoria: Yup.string().required("Campo Obrigatório!"),
        tipo: Yup.string().required("Campo Obrigatório!"),
        marca: Yup.string().required("Campo Obrigatório!"),
        modelo: Yup.string().required("Campo Obrigatório!"),
        quantidade: Yup.number().required("Campo Obrigatório!"),
        valorUnitario: Yup.string().required("Campo Obrigatório!"),
        fornecedor: Yup.string().required("Campo Obrigatório!"),
        cor: Yup.string(),
        descricao: Yup.string(),
        foto:Yup.string().required("Campo Obrigatório!")
    });

    return (
        <Pagina titulo={"Cadastro de Produto"}>
            <Formik
                initialValues={produtoEditado || initialValues}
                validationSchema={validationSchema}
                onSubmit={SalvarDados}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleReset,
                    handleChange,
                    handleSubmit,
                }) => {

                    useEffect(()=>{
                        if(values.categoria !== ''){
                            const filtroFornecedores = fornecedores.filter(item => item.catProdFornecido == values.categoria)
                            console.log(filtroFornecedores)
                            setFornecedores(filtroFornecedores)
                        }
                    },[values.categoria])

                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="text-center">
                                <h1 className="display-6">Dados do Produto</h1>
                            </div>
                            <hr />

                            {/* Campos */}

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Categoria</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="categoria"
                                        value={values.categoria}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.categoria &&
                                            !errors.categoria
                                        }
                                        isInvalid={
                                            touched.categoria &&
                                            errors.categoria
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {CatProd.map((categoria) => (
                                            <option value={categoria}>
                                                {categoria}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.categoria}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Tipo:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="tipo"
                                        type="text"
                                        value={values.tipo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.tipo && !errors.tipo}
                                        isInvalid={touched.tipo && errors.tipo}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.tipo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Marca:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="marca"
                                        type="text"
                                        value={values.marca}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.marca && !errors.marca}
                                        isInvalid={
                                            touched.marca && errors.marca
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.marca}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Modelo:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="modelo"
                                        type="text"
                                        value={values.modelo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.modelo && !errors.modelo
                                        }
                                        isInvalid={
                                            touched.modelo && errors.modelo
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.modelo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Quantidade:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="quantidade"
                                        type="number"
                                        min={0}
                                        step={1}
                                        value={values.quantidade}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.quantidade &&
                                            !errors.quantidade
                                        }
                                        isInvalid={
                                            touched.quantidade &&
                                            errors.quantidade
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.quantidade}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Valor Unitário (R$):</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="valorUnitario"
                                        type="number"
                                        min={0.0}
                                        step={0.1}
                                        value={values.valorUnitario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.valorUnitario &&
                                            !errors.valorUnitario
                                        }
                                        isInvalid={
                                            touched.valorUnitario &&
                                            errors.valorUnitario
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.valorUnitario}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Fornecedor:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="fornecedor"
                                        value={values.fornecedor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={
                                            touched.fornecedor &&
                                            !!errors.fornecedor
                                        }
                                        isValid={
                                            touched.fornecedor &&
                                            !errors.fornecedor
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {Fornecedores.map((fornecedor) => (
                                            <option
                                                value={fornecedor.nomeFantasia}
                                            >
                                                {fornecedor.nomeFantasia}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fornecedor}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Cor:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="cor"
                                        type="text"
                                        value={values.cor}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.cor && !!errors.cor}
                                        isValid={touched.cor && !errors.cor}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cor}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="my-2">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Descrição:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="descicao"
                                        type="text"
                                        value={values.descicao}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={
                                            touched.descicao &&
                                            !!errors.descicao
                                        }
                                        isValid={
                                            touched.descicao && !errors.descicao
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.descicao}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                            <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Foto:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="foto"
                                        type="text"
                                        placeholder="Link da foto"
                                        value={values.foto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={
                                            touched.foto &&
                                            !!errors.foto
                                        }
                                        isValid={
                                            touched.foto && !errors.foto
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.foto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="my-3">
                                <Form.Group className="text-start" as={Col}>
                                    <Button
                                        variant="secondary"
                                        href="/produtos"
                                    >
                                        {" "}
                                        <FaArrowLeft /> Voltar
                                    </Button>
                                </Form.Group>

                                <Form.Group className="text-end" as={Col}>
                                    <Button
                                        className="mx-3"
                                        onClick={handleReset}
                                    >
                                        {" "}
                                        <FaBrush /> Limpar
                                    </Button>
                                    <Button type="submit" variant="success">
                                        {" "}
                                        <FaCheck /> Salvar
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
