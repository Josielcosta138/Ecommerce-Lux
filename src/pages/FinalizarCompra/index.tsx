import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { Button, InputLabel, TextField, Modal, Box, Typography } from "@mui/material";
import "./index.css";
import "../../pages/Clientes/index.css";
import { wait } from "@testing-library/user-event/dist/utils";

const FinalizarCompra: FC = () => {
  const navigate = useNavigate();
  const carrinho = carregarCarrinho();
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const handleClose = () => setOpen(false);

  const finalizarCompra = () => {

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
          setOpen(true);
          setModalMessage("Não há cliente logado ao sistema!")

            setTimeout(() => {
              setOpen(false);
            } ,5000);
        }
  };


  const continuarComprando = () => {
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
      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Algo deu errado :/
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalMessage}
                    </Typography>
                </Box>
            </Modal>


      {carrinho.length > 0 && (
        <div className="resumo-compra">
          <h2>Resumo do Pedido</h2>
          <div className="total-compra">
            <span>Total: R$ {calcularTotal()}</span>
          </div>
          <button onClick={finalizarCompra} className="btn-finalizar-compra">
            Finalizar Compra
          </button>
          <button onClick={continuarComprando} className="btn-continuar-comprando">
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
};

export default FinalizarCompra;
