import React, { useState, useEffect } from 'react';
import './index.css';
import { IProduto } from '../Home/types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiGet } from '../../api/RestClient';

interface Pedido {
    id: number;
    dataPedido: string;
    status: string;
    totalPedido: number;
    formaPagamento: {
        nome: string;
    };
    endereco: {
        rua: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    itensPedido: Array<{
        produto: {
            nome: string;
            enderecoImagem: string;
        };
        quantidade: number;
        preco: number;
    }>;
}


const MeusPedidos = () => {
    const { id } = useParams<{ id: string }>();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        const carregarPedidos = async () => {
            if (id) {  
                try {
                    const response = await apiGet(`/pedidovenda/meuspedidos/carregar/${id}`);
                
                    const pedidosComStatusFixo = response.data.map((pedido: any) => ({
                        ...pedido,
                        status: 'Entregue', 
                    }));
                    setPedidos(pedidosComStatusFixo);
                } catch (error) {
                    console.error("Erro ao carregar pedidos:", error);
                }
            }
        };

        carregarPedidos();
    }, [id]);

    return (
        <div className="meus-pedidos-container">
            <h1>Meus Pedidos</h1>
            {pedidos.map(pedido => (
                <div key={pedido.id} className="pedido">
                    <div className="pedido-info">
                        <p><strong>Pedido ID :</strong> {pedido.id}</p>
                        <p><strong>Data :</strong> {pedido.dataPedido}</p>
                        <p><strong>Status : </strong> 
                        <span 
                        className={pedido.status ? pedido.status.toLowerCase().replace(' ', '-') : 'status-unknown'}>
                                {pedido.status || 'Status desconhecido'}
                        </span>
                        </p>
                        <p><strong>Total:</strong> R$ {pedido.totalPedido.toFixed(2)}</p>
                        <p><strong>Forma de Pagamento:</strong> {pedido.formaPagamento.nome}</p>
                        <div className="endereco">
                            <p><strong>Endereço:</strong></p>
                            <p>{pedido.endereco.rua}, {pedido.endereco.bairro}</p>
                            <p>{pedido.endereco.cidade} - {pedido.endereco.estado}</p>
                        </div>
                    </div>
                    <div className="pedido-itens">
                        <h2>Itens do Pedido</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Imagem</th> {/* Adicionada a coluna para a imagem */}
                                    <th>Nome do Produto</th>
                                    <th>Quantidade</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.itensPedido.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.produto.enderecoImagem && (
                                                <img 
                                                    src={`${process.env.PUBLIC_URL}/${item.produto.enderecoImagem}`} 
                                                    className="produto-imagem"
                                                />
                                            )}
                                        </td>
                                        <td>{item.produto.nome}</td>
                                        <td>{item.quantidade}</td>
                                        <td>R$ {item.preco.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MeusPedidos;
