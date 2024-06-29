import React, { useState } from 'react';
import './index.css';
import { IProduto } from '../Home/types';


const MeusPedidos = () => {

    const [produtos, setProdutos] = useState<IProduto[]>([]);

    const carregarPedidos = (idProduto: number) => {
        if (idProduto) {
            window.location.href = `produtosestoque/carregarProdutoEstoqueIdProduto/${idProduto}`;
          }

    }


  const pedidos = [
    {
      id: 1,
      data: '2023-06-15',
      status: 'Entregue',
      total: 'R$ 150,00',
      itens: [
        { nome: 'Produto 1', quantidade: 2, preco: 'R$ 50,00' },
        { nome: 'Produto 2', quantidade: 1, preco: 'R$ 50,00' }
      ]
    },
    {
      id: 2,
      data: '2023-06-20',
      status: 'A Caminho',
      total: 'R$ 200,00',
      itens: [
        { nome: 'Produto 3', quantidade: 1, preco: 'R$ 200,00' }
      ]
    }
    // Adicione mais pedidos conforme necessário
  ];

  return (
    <div className="meus-pedidos-container">
      <h1>Meus Pedidos</h1>
      {pedidos.map(pedido => (
        <div key={pedido.id} className="pedido">
          <div className="pedido-info">
            <p><strong>Pedido ID:</strong> {pedido.id}</p>
            <p><strong>Data:</strong> {pedido.data}</p>
            <p><strong>Status:</strong> 
              <span className={pedido.status.toLowerCase().replace(' ', '-')}>
                {pedido.status}
              </span>
            </p>
            <p><strong>Total:</strong> {pedido.total}</p>
          </div>
          <div className="pedido-itens">
            <h2>Itens do Pedido</h2>
            <table>
              <thead>
                <tr>
                  <th>Nome do Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                {pedido.itens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.preco}</td>
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
