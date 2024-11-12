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

    const CatProdForn = [
        "Periféricos para pc",
        "Acessórios para console",
        "Acessórios para celular",
        "Aparelhos celular",
        "Relógios",
        "Fones de Ouvido",
        "Produtos diversos",
    ];

    // Para armazenar ou buscar dados de funcionarios no local storage
    const fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

    // Recuperar identificador para edições
    const id = props.searchParams.id;
    console.log(props.searchParams.id);

    // Busca no local storage o funcionário usando o id de parâmetro
    const fornecedorEditado = fornecedores.find((item) => item.id == id);
    console.log(fornecedorEditado);

    // Para salvar ou editar os dados do formulário
    function SalvarDados(dados) {
        fornecedorEditado
            ? (Object.assign(fornecedorEditado, dados),
              localStorage.setItem(
                  "fornecedores",
                  JSON.stringify(fornecedores)
              ),
              alert("Fornecedor editado com sucesso!"))
            : ((dados.id = v4()),
              fornecedores.push(dados),
              localStorage.setItem(
                  "fornecedores",
                  JSON.stringify(fornecedores)
              ),
              alert("Fornecedor cadastrado com sucesso!"));

        roteamento.push("/fornecedores");
    }

    const initialValues = {
        nomeResponsavel: "",
        nomeFantasia: "",
        cnpj: "",
        email: "",
        telComercial: "",
        catProdFornecido: "",
        enderecoCompleto: "",
        cidade: "",
        estado: "",
        cep: "",
    };

    const validationSchema = Yup.object().shape({
        nomeResponsavel: Yup.string().required("Campo Obrigatório!"),
        nomeFantasia: Yup.string().required("Campo Obrigatório!"),
        cnpj: Yup.string().required("Campo Obrigatório!"),
        email: Yup.string()
            .email("Email inválido!")
            .required("Campo Obrigatório!"),
        telComercial: Yup.string().required("Campo Obrigatório!"),
        catProdFornecido: Yup.string().required("Campo Obrigatório!"),
        enderecoCompleto: Yup.string().required("Campo Obrigatório!"),
        cidade: Yup.string().required("Campo Obrigatório!"),
        estado: Yup.string().required("Campo Obrigatório!"),
        cep: Yup.string().required("Campo Obrigatório!"),
    });

    return (
        <Pagina titulo={"Cadastro de Fornecedor"}>
            <Formik
                initialValues={fornecedorEditado || initialValues}
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
                                <h1 className="display-6">
                                    Dados do Fornecedor
                                </h1>
                            </div>
                            <hr />

                            {/* Campos */}

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Nome do(a) Responsável:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="nomeResponsavel"
                                        type="text"
                                        value={values.nomeResponsavel}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.nomeResponsavel &&
                                            !errors.nomeResponsavel
                                        }
                                        isInvalid={
                                            touched.nomeResponsavel &&
                                            errors.nomeResponsavel
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nomeResponsavel}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Nome Fantasia:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="nomeFantasia"
                                        type="text"
                                        value={values.nomeFantasia}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.nomeFantasia &&
                                            !errors.nomeFantasia
                                        }
                                        isInvalid={
                                            touched.nomeFantasia &&
                                            errors.nomeFantasia
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nomeFantasia}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>CNPJ:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        as={ReactInputMask}
                                        mask={"99.999.999/9999-99"}
                                        name="cnpj"
                                        type="text"
                                        value={values.cnpj}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.cnpj && !errors.cnpj}
                                        isInvalid={touched.cnpj && errors.cnpj}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cnpj}
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
                                        placeholder="example@gmail.com"
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
                                        <b>Telefone Comercial:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        as={ReactInputMask}
                                        mask={"(99)99999-9999"}
                                        name="telComercial"
                                        type="text"
                                        value={values.telComercial}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.telComercial &&
                                            !errors.telComercial
                                        }
                                        isInvalid={
                                            touched.telComercial &&
                                            errors.telComercial
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.telComercial}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>
                                            Categoria de Produto Fornecido:
                                        </b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="catProdFornecido"
                                        value={values.catProdFornecido}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.catProdFornecido &&
                                            !errors.catProdFornecido
                                        }
                                        isInvalid={
                                            touched.catProdFornecido &&
                                            errors.catProdFornecido
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {CatProdForn.map((cat) => (
                                            <option value={cat}>{cat}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.catProdFornecido}
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
                                        isInvalid={
                                            touched.enderecoCompleto &&
                                            !!errors.enderecoCompleto
                                        }
                                        isValid={
                                            touched.enderecoCompleto &&
                                            !errors.enderecoCompleto
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
                                        isInvalid={
                                            touched.estado && !!errors.estado
                                        }
                                        isValid={
                                            touched.estado && !errors.estado
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
                                        isInvalid={
                                            touched.cidade && !!errors.cidade
                                        }
                                        isValid={
                                            touched.cidade && !errors.cidade
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
                                        isInvalid={touched.cep && !!errors.cep}
                                        isValid={touched.cep && !errors.cep}
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
                                        href="/fornecedores"
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
