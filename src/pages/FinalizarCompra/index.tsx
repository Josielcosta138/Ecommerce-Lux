import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import "./index.css";

const FinalizarCompra: FC = () => {
  const navigate = useNavigate();
  const carrinho = carregarCarrinho();

  const handleFinalizarCompra = () => {

    const clienteJSON = localStorage.getItem("cliente");
    if (clienteJSON) {
      const cliente = JSON.parse(clienteJSON);
      const nomeCliente = cliente.nome || "";
      const emailCliente = cliente.email || "";
      const idCliente = cliente.id || "";


      // Armazena os dados no localStorage para a página de checkout
      localStorage.setItem("nomeCliente", nomeCliente);
      localStorage.setItem("emailCliente", emailCliente);
      localStorage.setItem("idCliente", idCliente);

      navigate("/checkout");
    } else {
      alert("Não há informações de cliente no localStorage.");
    }
  };

  const handleContinuarComprando = () => {
    navigate("/produtos");
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  return (
    <div className="finalizar-compra-container">
      <h1>Finalizar Compra</h1>
      <div className="itens-carrinho">
        {carrinho.length > 0 ? (
          carrinho.map((item, index) => (
            <div key={index} className="item-carrinho">
              <img src={`/${item.enderecoImagem}`} alt={item.nome} className="imagem-item" />
              <div className="detalhes-item">
                <span className="item-nome">{item.nome}</span>
                <span className="item-quantidade">{`Quantidade: ${item.quantidade}`}</span>
                <span className="item-preco">{`Preço: R$ ${item.preco}`}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </div>
      {carrinho.length > 0 && (
        <div className="resumo-compra">
          <h2>Resumo do Pedido</h2>
          <div className="total-compra">
            <span>Total: R$ {calcularTotal()}</span>
          </div>
          <button onClick={handleFinalizarCompra} className="btn-finalizar-compra">
            Finalizar Compra
          </button>
          <button onClick={handleContinuarComprando} className="btn-continuar-comprando">
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalizarCompra;
