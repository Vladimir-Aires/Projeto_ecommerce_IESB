'use client'

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";


export default function PedidosPage() {

    const [ pedidos, setPedidos] = useState([]);


    function excluir(pedido){
        if(window.confirm(`Realmente deseja excluir o pedido?`)){
            const listaAtualizada = pedidos.filter(item => item.id !== pedido.id)

            localStorage.setItem('pedidos', JSON.stringify(listaAtualizada))
            setPedidos(listaAtualizada)
            alert('Pedido excluído com sucesso!')
        }
    }


    useEffect(() => {
        const pedidosLS = JSON.parse(localStorage.getItem('pedidos')) || [];

        setPedidos(pedidosLS)
        console.log(pedidosLS)
    }, [])

    return (
        <Pagina titulo={"Pedidos"}>
            <div className="text-end mb-2">
                <Button href="/pedidos/form">
                 <FaPlusCircle/> Novo Pedido
                </Button>
            </div>

            {/* Tabela com os funcionários */}
            <Table striped bordered hover>
                <thead className="text-center">
                    <tr className="table-dark">
                        <th>Data do Pedido</th>
                        <th>Status</th>
                        <th>Nome do(a) Cliente</th>
                        <th>Endereço de Entrega</th>
                        <th>Tipo do Produto</th>
                        <th>Valor Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </Table>
        </Pagina>
    );
}
