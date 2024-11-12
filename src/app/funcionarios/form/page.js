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
    const [Cargos, setCargos] = useState([]);
    const roteamento = useRouter();

    const cargosPorDepartamento = [
        {
            id: 1,
            departamento: "Vendas",
            cargo: ["Vendedor", "Assistente de Vendas", "Gerente de Vendas"],
        },
        {
            id:2,
            departamento: "Marketing",
            cargo: ["Analista de Marketing", "Gestor de Mídias Sociais"],
        },
        {
            id:3,
            departamento: "RH",
            cargo: ["Recrutador", "Gerente de RH", "Analista de RH"],
        },
        {
            id:4,
            departamento: "Financeiro",
            cargo: ["Contator", "Analista Financeiro", "Gerente Financeiro"],
        },
        {
            id:5,
            departamento: "T.I.",
            cargo: ["Desenvolvedor", "Suporte Técnico", "Gerente de TI"],
        },
        {
            id:6,
            departamento: "Atendimento ao Cliente",
            cargo: [
                "Atendente",
                "Assistente de Atendimento",
                "Gerente de Atendimento ao Cliente",
            ],
        },
    ];

    // Para armazenar ou buscar dados de funcionarios no local storage
    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

    // Recuperar identificador para edições
    const id = props.searchParams.id;
    console.log(props.searchParams.id);

    // Busca no local storage o funcionário usando o id de parâmetro
    const funcionarioEditado = funcionarios.find((item) => item.id == id);
    console.log(funcionarioEditado);

    // Para salvar ou editar os dados do formulário
    function SalvarDados(dados) {
        funcionarioEditado
            ? (Object.assign(funcionarioEditado, dados),
              localStorage.setItem(
                  "funcionarios",
                  JSON.stringify(funcionarios)
              ),
              alert("Funcionário(a) editado(a) com sucesso!"))
            : ((dados.id = v4()),
              funcionarios.push(dados),
              localStorage.setItem(
                  "funcionarios",
                  JSON.stringify(funcionarios)
              ),
              alert("Funcionário(a) cadastrado(a) com sucesso!"));

        roteamento.push("/funcionarios");
    }

    const initialValues = {
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        cpf: "",
        telefone: '',
        estadoCivil: "",
        email: "",
        foto: "",
        cargo: "",
        departamento: "",
    };

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Campo Obrigatório!"),
        sobrenome: Yup.string().required("Campo Obrigatório!"),
        dataNascimento: Yup.date().required("Campo Obrigatório!"),
        cpf: Yup.string().required("Campo Obrigatório!"),
        telefone: Yup.string().required("Campo Obrigatório!"),
        estadoCivil: Yup.string().required("Campo Obrigatório!"),
        email: Yup.string().email().required("Campo Obrigatório!"),
        foto: Yup.string().required("Campo Obrigatório!"),
        cargo: Yup.string().required("Campo Obrigatório!"),
        departamento: Yup.string().required("Campo Obrigatório!"),
    });

    return (
        <Pagina titulo={"Cadastro de Funcionário(a)"}>
            <Formik
                initialValues={funcionarioEditado || initialValues}
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
                        if (values.departamento !== "") {
                            const depart = cargosPorDepartamento.find(
                                (item) =>
                                    item.departamento == values.departamento
                            );
                            console.log(depart.cargo);
                            setCargos(depart.cargo);
                        }
                    }, [values.departamento]);

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
                                        isValid={touched.telefone && !errors.telefone}
                                        isInvalid={touched.telefone && errors.telefone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.telefone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Estado Civil:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="estadoCivil"
                                        value={values.estadoCivil}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.estadoCivil &&
                                            !errors.estadoCivil
                                        }
                                        isInvalid={
                                            touched.estadoCivil &&
                                            errors.estadoCivil
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        <option value="solteiro(a)">
                                            Solteiro(a)
                                        </option>
                                        <option value="casado(a)">
                                            Casado(a)
                                        </option>
                                        <option value="divorciado(a)">
                                            Divorciado(a)
                                        </option>
                                        <option value="Outros">Outros</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.estadoCivil}
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
                                        placeholder="example@email.com"
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
                                        <b>Foto (link):</b>{" "}
                                    </Form.Label>
                                    <Form.Control
                                        name="foto"
                                        type="text"
                                        value={values.foto}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.foto && !errors.foto}
                                        isInvalid={touched.foto && errors.foto}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.foto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <div className="text-center">
                                <h1 className="display-6">
                                    Dados Corporativos
                                </h1>
                            </div>
                            <hr />

                            <Row className="my-3">
                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Departamento:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="departamento"
                                        value={values.departamento}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={
                                            touched.departamento &&
                                            !errors.departamento
                                        }
                                        isInvalid={
                                            touched.departamento &&
                                            errors.departamento
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {cargosPorDepartamento.map((item) => (
                                            <option value={item.departamento}>
                                                {item.departamento}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.departamento}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>
                                        {" "}
                                        <b>Cargo:</b>{" "}
                                    </Form.Label>
                                    <Form.Select
                                        name="cargo"
                                        value={values.cargo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isValid={touched.cargo && !errors.cargo}
                                        isInvalid={
                                            touched.cargo && errors.cargo
                                        }
                                    >
                                        <option value="">Selecione</option>
                                        {Cargos.map((cargo) => (
                                            <option value={cargo}>
                                                {cargo}
                                            </option>
                                        ))}
                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.cargo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="my-3">
                            <Form.Group className="text-start" as={Col}>
                                <Button variant="secondary" href="/funcionarios"> <FaArrowLeft/> Voltar</Button>
                            </Form.Group>

                            <Form.Group className="text-end" as={Col}>
                                
                                <Button className="mx-3" onClick={handleReset}> <FaBrush/> Limpar</Button>
                                <Button type="submit" variant="success"> <FaCheck/> Salvar</Button>
                            </Form.Group>
                            </Row>

                            
                        </Form>
                    );
                }}
            </Formik>
        </Pagina>
    );
}
