'use client'

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";


export default function FuncionariosPage() {

    const [ funcionarios, setFuncionarios] = useState([]);


    function excluir(f){
        if(window.confirm(`Realmente deseja excluir o(a) funcionário(a) ${f.nome} ${f.sobrenome}?`)){
            const listaAtualizada = funcionarios.filter(item => item.id !== f.id)

            localStorage.setItem('funcionarios', JSON.stringify(listaAtualizada))
            setFuncionarios(listaAtualizada)
            alert('Funcionário(a) excluído com sucesso!')
        }
    }


    useEffect(() => {
        const funcionariosLS = JSON.parse(localStorage.getItem('funcionarios')) || [];

        setFuncionarios(funcionariosLS)
        console.log(funcionariosLS)
    }, [])

    return (
        <Pagina titulo={"Funcionários"}>
            <div className="text-end mb-2">
                <Button href="/funcionarios/form">
                 <FaPlusCircle/> Novo
                </Button>
            </div>

            {/* Tabela com os funcionários */}
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr className="table-dark">
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>CPF</th>
                        <th>Cargo</th>
                        <th>Departamento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map(funcionario => (
                        <tr>
                            <td className="text-center">
                                <img src={funcionario.foto} width={60} className="rounded"/>
                            </td>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.sobrenome}</td>
                            <td>{funcionario.cpf}</td>
                            <td>{funcionario.cargo}</td>
                            <td>{funcionario.departamento}</td>
                            <td className="text-center">
                                <Button className="mx-2" href={`/funcionarios/form?id=${funcionario.id}`} variant="warning"> <FaPen/> </Button>
                                <Button variant="danger" onClick={() => excluir(funcionario)}> <FaTrash/> </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
