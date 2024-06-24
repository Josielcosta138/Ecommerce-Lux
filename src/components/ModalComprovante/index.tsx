import React from "react";
import "./index.css";

interface Props {
  dadosPedido: any;
}

const ModalComprovante: React.FC<Props> = ({ dadosPedido }) => {
  return (
    <div className="modal-comprovante">
      <div className="comprovante-header">
        <h2>Comprovante de Compra</h2>
        <button className="btn-fechar" onClick={() => 
                window.location.href = "/home"}
            >Fechar</button>
      </div>
      <div className="comprovante-body">
        <p><strong>Data do Pedido:</strong> {dadosPedido.dataPedido}</p>
        <p><strong>Cliente:</strong> {dadosPedido.cliente}</p>
        <p><strong>Total do Pedido:</strong> R$ {dadosPedido.totalPedido.toFixed(2)}</p>
        {/* Mais informações podem ser adicionadas conforme necessário */}
      </div>
      <div className="comprovante-footer">
        <p>Obrigado por sua compra! Esperamos vê-lo novamente em breve.</p>
      </div>
    </div>
  );
};

export default ModalComprovante;
