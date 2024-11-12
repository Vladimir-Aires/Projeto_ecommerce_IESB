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

export default function FuncionariosFormPage(props) {
    const roteamento = useRouter();

    // Para armazenar ou buscar dados de funcionarios no local storage
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Recuperar identificador para edições
    const id = props.searchParams.id;
    console.log(props.searchParams.id);

    // Busca no local storage o funcionário usando o id de parâmetro
    const clienteEditado = clientes.find((item) => item.id == id);
    console.log(clienteEditado);

    // Para salvar ou editar os dados do formulário
    function SalvarDados(dados) {
        clienteEditado
            ? (Object.assign(clienteEditado, dados),
              localStorage.setItem("clientes", JSON.stringify(clientes)),
              alert("Cliente editado(a) com sucesso!"))
            : ((dados.id = v4()),
              clientes.push(dados),
              localStorage.setItem("clientes", JSON.stringify(clientes)),
              alert("Cliente cadastrado(a) com sucesso!"));

        roteamento.push("/clientes");
    }

    const initialValues = {
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        email: "",
        telefone: "",
        enderecoCompleto: "",
        estado: "",
        cidade: "",
        cep: "",
    };

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Campo Obrigatório!"),
        sobrenome: Yup.string().required("Campo Obrigatório!"),
        dataNascimento: Yup.date().required("Campo Obrigatório!"),
        email: Yup.string()
            .email("Email inválido!")
            .required("Campo Obrigatório!"),
        telefone: Yup.string().required("Campo Obrigatório!"),
        enderecoCompleto: Yup.string().required("Campo Obrigatório!"),
        estado: Yup.string().required("Campo Obrigatório!"),
        cidade: Yup.string().required("Campo Obrigatório!"),
        cep: Yup.string().required("Campo Obrigatório!"),
    });

    return (
        <Pagina titulo={"Cadastro de Cliente"}>
            <Formik
                initialValues={clienteEditado || initialValues}
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
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="text-center">
                                <h1 className="display-6">Dados Pessoais</h1>
                            </div>
                            <hr />

                            {/* Campos */}

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Nome:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="nome"
                                        type="text"
                                        value={values.nome}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.nome && !errors.nome}
                                        isInvalid={touched.nome && errors.nome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nome}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Sobrenome:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="sobrenome"
                                        type="text"
                                        value={values.sobrenome}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.sobrenome &&
                                            !errors.sobrenome
                                        }
                                        isInvalid={
                                            touched.sobrenome &&
                                            errors.sobrenome
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sobrenome}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Data de Nascimento:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="dataNascimento"
                                        type="date"
                                        value={values.dataNascimento}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.dataNascimento &&
                                            !errors.dataNascimento
                                        }
                                        isInvalid={
                                            touched.dataNascimento &&
                                            errors.dataNascimento
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.dataNascimento}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Email:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={
                                            touched.email && errors.email
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Telefone:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        as={ReactInputMask}
                                        mask={"(99)99999-9999"}
                                        name="telefone"
                                        type="text"
                                        value={values.telefone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.telefone && !errors.telefone
                                        }
                                        isInvalid={
                                            touched.telefone && errors.telefone
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.telefone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <div className="text-center">
                                <h1 className="display-6">Endereço</h1>
                            </div>
                            <hr />

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Endereço Completo:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="enderecoCompleto"
                                        type="text"
                                        value={values.enderecoCompleto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.enderecoCompleto &&
                                            !errors.enderecoCompleto
                                        }
                                        isInvalid={
                                            touched.enderecoCompleto &&
                                            errors.enderecoCompleto
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.enderecoCompleto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Estado:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="estado"
                                        type="text"
                                        value={values.estado}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.estado && !errors.estado
                                        }
                                        isInvalid={
                                            touched.estado && errors.estado
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.estado}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Cidade:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="cidade"
                                        type="text"
                                        value={values.cidade}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.cidade && !errors.cidade
                                        }
                                        isInvalid={
                                            touched.cidade && errors.cidade
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cidade}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>CEP:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        as={ReactInputMask}
                                        mask={"99999-999"}
                                        name="cep"
                                        type="text"
                                        value={values.cep}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.cep && !errors.cep}
                                        isInvalid={touched.cep && errors.cep}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cep}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="my-3">
                                <Form.Group className="text-start" as={Col}>
                                    <Button
                                        variant="secondary"
                                        href="/clientes"
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
