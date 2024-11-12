'use client'

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";


export default function ClientesPage() {

    const [ clientes, setClientes] = useState([]);


    function excluir(cliente){
        if(window.confirm(`Realmente deseja excluir o(a) cliente ${cliente.nome} ${cliente.sobrenome}?`)){
            const listaAtualizada = clientes.filter(item => item.id !== cliente.id)

            localStorage.setItem('clientes', JSON.stringify(listaAtualizada))
            setClientes(listaAtualizada)
            alert('Cliente excluído(a) com sucesso!')
        }
    }


    useEffect(() => {
        const clientesLS = JSON.parse(localStorage.getItem('clientes')) || [];

        setClientes(clientesLS)
        console.log(clientesLS)
    }, [])

    return (
        <Pagina titulo={"Clientes"}>
            <div className="text-end mb-2">
                <Button href="/clientes/form">
                 <FaPlusCircle/> Novo
                </Button>
            </div>

            {/* Tabela com os clientes */}
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr className="table-dark">
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Telefone de Contato</th>
                        <th>Email de Contato</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {clientes.map(cliente => (
                        <tr>
                            <td>{cliente.nome}</td>
                            <td>{cliente.sobrenome}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td className="text-center">
                                <Button className="mx-2" href={`/clientes/form?id=${cliente.id}`} variant="warning"> <FaPen/> </Button>
                                <Button variant="danger" onClick={() => excluir(cliente)}> <FaTrash/> </Button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
        </Pagina>
    );
}
