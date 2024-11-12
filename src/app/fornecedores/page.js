'use client'

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";


export default function FuncionariosPage() {

    const [fornecedores, setFornecedores] = useState([]);


    function excluir(forn){
        if(window.confirm(`Realmente deseja excluir o fornecedor ${forn.nomeFantasia}?`)){
            const listaAtualizada = fornecedores.filter(item => item.id !== forn.id)

            localStorage.setItem('fornecedores', JSON.stringify(listaAtualizada))
            setFornecedores(listaAtualizada)
            alert('Fornecedor excluído com sucesso!')
        }
    }


    useEffect(() => {
        const fornecedoresLS = JSON.parse(localStorage.getItem('fornecedores')) || [];

        setFornecedores(fornecedoresLS)
        console.log(fornecedoresLS)
    }, [])

    return (
        <Pagina titulo={"Fornecedores"}>
            <div className="text-end mb-2">
                <Button href="/fornecedores/form">
                 <FaPlusCircle/> Novo
                </Button>
            </div>

            {/* Tabela com os fornecedores */}
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr className="table-dark">
                        <th>Nome Fantasia</th>
                        <th>CNPJ</th>
                        <th>Telefone Comercial</th>
                        <th>Categoria do Produto Fornecido</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.map(fornecedor => (
                        <tr>
                            <td>{fornecedor.nomeFantasia}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.telComercial}</td>
                            <td>{fornecedor.catProdFornecido}</td>
                            <td className="text-center">
                                <Button className="mx-2" href={`/fornecedores/form?id=${fornecedor.id}`} variant="warning"> <FaPen/> </Button>
                                <Button variant="danger" onClick={() => excluir(fornecedor)}> <FaTrash/> </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
