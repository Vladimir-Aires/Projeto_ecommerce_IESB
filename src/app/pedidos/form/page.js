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

export default function PedidosFormPage(props) {
    const roteamento = useRouter();

    const [valorTotal, setValorTotal] = useState();

    // Para armazenar ou buscar dados de funcionarios no local storage
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    // Recuperar identificador para edições
    const id = props.searchParams.id;
    console.log(props.searchParams.id);

    // Busca no local storage o funcionário usando o id de parâmetro
    const pedidoEditado = pedidos.find((item) => item.id == id);
    console.log(pedidoEditado);

    // Para salvar ou editar os dados do formulário
    function SalvarDados(dados) {
        pedidoEditado
            ? (Object.assign(pedidoEditado, dados),
              localStorage.setItem("pedidos", JSON.stringify(pedidos)),
              alert("Pedido editado com sucesso!"))
            : ((dados.id = v4()),
              pedidos.push(dados),
              localStorage.setItem("pedidos", JSON.stringify(pedidos)),
              alert("Pedido editado com sucesso!"));

        roteamento.push("/pedidos");
    }

    const initialValues = {
        data: "",
        status: "",
        nomeCliente: "",
        cpf: "",
        email: "",
        telefone: "",
        enderecoEntrega: "",
        estado: "",
        cidade: "",
        tipoProd: "",
        marca: "",
        quantidade: 0,
        valorTotal: "",
        encarregado: "",
    };

    const validationSchema = Yup.object().shape({
        data: Yup.date().required("Campo Obrigatório!"),
        status: Yup.string().required("Campo Obrigatório!"),
        nomeCliente: Yup.string().required("Campo Obrigatório!"),
        cpf: Yup.string().required("Campo Obrigatório!"),
        email: Yup.string().email().required("Campo Obrigatório!"),
        telefone: Yup.string().required("Campo Obrigatório!"),
        enderecoEntrega: Yup.string().required("Campo Obrigatório!"),
        estado: Yup.string().required("Campo Obrigatório!"),
        cidade: Yup.string().required("Campo Obrigatório!"),
        tipoProd: Yup.string().required("Campo Obrigatório!"),
        marca: Yup.string().required("Campo Obrigatório!"),
        quantidade: Yup.number().required("Campo Requerido!"),
        valorTotal: Yup.string().required("Campo Obrigatório!"),
    });

    return (
        <Pagina titulo={"Registro de Pedido"}>
            <Formik
                initialValues={pedidoEditado || initialValues}
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
                    useEffect(() => {
                        const numqtd = +values.quantidade;
                        const vlrUnit = Number(produtos.valorUnitario)

                        if(values.quantidade !== ''){
                            const valorFinal = (numqtd * vlrUnit).toFixed(2);
                            console.log(valorFinal)
                            setValorTotal(valorFinal)
                        }
                        

                    }, [values.quantidade]);

                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="text-center">
                                <h1 className="display-6">Pedido</h1>
                            </div>
                            <hr />

                            {/* Campos */}

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Data do pedido:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="data"
                                        type="date"
                                        value={values.data}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.data && !errors.data}
                                        isInvalid={touched.data && errors.data}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Status do Pedido:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.status && !errors.status
                                        }
                                        isInvalid={
                                            touched.status && errors.status
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        <option value="">Enviado</option>
                                        <option value="">Em processo</option>
                                        <option value="">Finalizado</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Cliente:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="nomeCliente"
                                        value={values.nomeCliente}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.nomeCliente &&
                                            !errors.nomeCliente
                                        }
                                        isInvalid={
                                            touched.nomeCliente &&
                                            errors.nomeCliente
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {clientes.map((cliente) => {
                                            <option value={cliente.nome}>
                                                {cliente.nome}{" "}
                                                {cliente.sobrenome}
                                            </option>;
                                        })}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nomeCliente}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>CPF:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        as={ReactInputMask}
                                        mask={"999999999-99"}
                                        name="cpf"
                                        type="text"
                                        value={values.cpf}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.cpf && !errors.cpf}
                                        isInvalid={touched.cpf && errors.cpf}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cpf}
                                    </Form.Control.Feedback>
                                </Form.Group>

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
                                <h1 className="display-6">Info. de Entrega</h1>
                            </div>
                            <hr />
                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Endereço Completo:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="enderecoEntrega"
                                        type="text"
                                        value={values.enderecoEntrega}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.enderecoEntrega &&
                                            !errors.enderecoEntrega
                                        }
                                        isInvalid={
                                            touched.enderecoEntrega &&
                                            errors.enderecoEntrega
                                        }
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.enderecoEntrega}
                                    </Form.Control.Feedback>
                                </Form.Group>

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
                            </Row>

                            <div className="text-center">
                                <h1 className="display-6">Info. De Produto</h1>
                            </div>
                            <hr />

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Tipo de Produto:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="tipoProd"
                                        value={values.tipoProd}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.tipoProd && !errors.tipoProd
                                        }
                                        isInvalid={
                                            touched.tipoProd && errors.tipoProd
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {produtos.map((produto) => (
                                            <option value={produto.tipo}>
                                                {produto.tipo}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.tipoProd}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Marca:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="marca"
                                        value={values.marca}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.marca && !errors.marca}
                                        isInvalid={
                                            touched.marca && errors.marca
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {produtos.map((produto) => (
                                            <option value={produto.marca}>
                                                {produto.marca}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.marca}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Quantidade:</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="quantidade"
                                        min={1}
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
                                    ></Form.Control>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.quantidade}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Valor Total:</b>{" "}
                                    </Form.Label>
                                    <div>
                                        <h1 className="display-5">{valorTotal}</h1>
                                    </div>
                                </Form.Group>
                            </Row>

                            <Row className="my-3">
                                <Form.Group className="text-start" as={Col}>
                                    <Button variant="secondary" href="/pedidos">
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
