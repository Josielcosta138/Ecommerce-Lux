import React from "react";
import "./index.css";

interface Props {
  dadosPedido: {
    dataPedido: string;
    cliente: string;
    totalPedido: number;
  };
}

const ModalComprovante: React.FC<Props> = ({ dadosPedido }) => {
  window.setTimeout(() => {
    window.location.href = '/home';
  }, 5000);

  return (
    <div className="modal-comprovante">
      <div className="comprovante-header">
        <h2>Comprovante de Compra</h2>
      </div>
      <div className="comprovante-body">
        <p><strong>Data do Pedido:</strong> {dadosPedido.dataPedido}</p>
        <p><strong>Cliente:</strong> {dadosPedido.cliente}</p>
        <p><strong>Total do Pedido:</strong> R$ {dadosPedido.totalPedido.toFixed(2)}</p>
      </div>
      <div className="comprovante-footer">
        <p>Obrigado por sua compra! Esperamos vê-lo novamente em breve.</p>
        <p></p>
        <p>Visualize sua compra em <span className="espaco"  style={{ color: 'blue' }}>Meus Pedidos</span>.</p>
      </div>
    </div>
  );
};

export default ModalComprovante;
