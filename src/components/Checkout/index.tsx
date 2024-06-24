import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import "./index.css";
import BotaoPadrao from "../BtnPadrao";
import ModalComprovante from "../ModalComprovante";

interface ItemCarrinho {
  nome: string;
  enderecoImagem: string;
  quantidade: number;
  preco: number;
  id: number;
}

const Checkout: FC = () => {
  const [mostrarComprovante, setMostrarComprovante] = useState(false);
  const [dadosPedidoAtual, setDadosPedidoAtual] = useState<any>(null);
  const navigate = useNavigate();
  const carrinho: ItemCarrinho[] = carregarCarrinho() as ItemCarrinho[];

  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [formaPagamento, setFormaPagamento] = useState<string>("");

  const handleFinalizarCompra = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataPedido = new Date().toISOString().split('T')[0];
    const clienteId = 3;
    const enderecoId = 5;
    const formaPagamentoId = 2;

    const itensPedido = carrinho.map(item => ({
      produto: { id: item.id },
      quantidade: item.quantidade,
      preco: item.preco,
    }));

    const dadosPedido = {
      dataPedido,
      cliente: nome,
      totalPedido: parseFloat(calcularTotal()),
      clientesId: clienteId,
      enderecoId,
      formaPagamentoId,
      itensPedido,
    };

    const limparCarrinho = () => {
      localStorage.removeItem("carrinho");
      // window.location.reload();
    };

    try {
      const response = await axios.post("http://localhost:8085/ecommerce/pedidovenda/criar", dadosPedido);
      if (response.status === 201) {
        setDadosPedidoAtual(dadosPedido);
        setMostrarComprovante(true);
        limparCarrinho();
      } else {
        alert("Erro ao finalizar a compra.");
      }
    } catch (error) {
      console.error("Erro ao criar pedido de venda:", error);
      alert("Erro ao finalizar a compra.");
    }
  };

  const calcularTotal = (): string => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  const renderizarPagamento = () => {
    switch (formaPagamento) {
      case "cartaoCredito":
        return (
          <div className="pagamento-detalhes">
            <h3>Informações do Cartão de Crédito</h3>
            <div className="form-group">
              <label htmlFor="numCartaoCredito">Número do Cartão</label>
              <input type="text" id="numCartaoCredito" required />
            </div>
            <div className="form-group">
              <label htmlFor="nomeCartaoCredito">Nome no Cartão</label>
              <input type="text" id="nomeCartaoCredito" required />
            </div>
            <div className="form-group">
              <label htmlFor="validadeCartaoCredito">Validade</label>
              <input type="text" id="validadeCartaoCredito" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvvCartaoCredito">CVV</label>
              <input type="text" id="cvvCartaoCredito" required />
            </div>
          </div>
        );
      case "cartaoDebito":
        return (
          <div className="pagamento-detalhes">
            <h3>Informações do Cartão de Débito</h3>
            <div className="form-group">
              <label htmlFor="numCartaoDebito">Número do Cartão</label>
              <input type="text" id="numCartaoDebito" required />
            </div>
            <div className="form-group">
              <label htmlFor="nomeCartaoDebito">Nome no Cartão</label>
              <input type="text" id="nomeCartaoDebito" required />
            </div>
            <div className="form-group">
              <label htmlFor="validadeCartaoDebito">Validade</label>
              <input type="text" id="validadeCartaoDebito" required />
            </div>
            <div className="form-group">
              <label htmlFor="cvvCartaoDebito">CVV</label>
              <input type="text" id="cvvCartaoDebito" required />
            </div>
          </div>
        );
      case "pix":
        return (
          <div className="pagamento-detalhes">
            <h3>Pagamento via Pix</h3>
            <p>Escaneie o QR code abaixo para pagar via Pix:</p>
            <img src="/path/to/qrcode.png" alt="QR code Pix" className="qrcode-pix" />
            <p>Código Pix: 12345678901234567890</p>
          </div>
        );
      case "boleto":
        return (
          <div className="pagamento-detalhes">
            <h3>Pagamento via Boleto</h3>
            <p>Imprima o boleto e pague em qualquer banco ou lotérica.</p>
            <button className="btn-gerar-boleto">Gerar Boleto</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h1>Confirme seus dados</h1>
        <form onSubmit={handleFinalizarCompra}>
          <h2>Informações do Cliente</h2>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>
          <h2>Forma de Pagamento</h2>
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="formaPagamento"
                value="cartaoCredito"
                checked={formaPagamento === "cartaoCredito"}
                onChange={(e) => setFormaPagamento(e.target.value)}
              />
              Cartão de Crédito
            </label>
            <label>
              <input
                type="radio"
                name="formaPagamento"
                value="cartaoDebito"
                checked={formaPagamento === "cartaoDebito"}
                onChange={(e) => setFormaPagamento(e.target.value)}
              />
              Cartão de Débito
            </label>
            <label>
              <input
                type="radio"
                name="formaPagamento"
                value="pix"
                checked={formaPagamento === "pix"}
                onChange={(e) => setFormaPagamento(e.target.value)}
              />
              Pix
            </label>
            <label>
              <input
                type="radio"
                name="formaPagamento"
                value="boleto"
                checked={formaPagamento === "boleto"}
                onChange={(e) => setFormaPagamento(e.target.value)}
              />
              Boleto
            </label>
          </div>
          {renderizarPagamento()}
          <button type="submit" className="btn-finalizar-compra">
            Finalizar Compra
          </button>
        </form>
      </div>
      <div className="checkout-right">
        <h2>Resumo do Pedido</h2>
        <div className="itens-carrinho">
          {carrinho.length > 0 ? (
            carrinho.map((item, index) => (
              <div key={index} className="item-carrinho">
                <img src={`/${item.enderecoImagem}`} alt={item.nome} className="imagem-item" />
                <div className="detalhes-item">
                  <span className="item-nome">{item.nome}</span>
                  <div className="item-detalhes">
                    <span className="item-quantidade">Quantidade: {item.quantidade}</span>
                    <span className="item-preco">Preço: R$ {item.preco}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Seu carrinho está vazio.</p>
          )}
        </div>
        <div className="total-compra">
          <span>Total: R$ {calcularTotal()}</span>
        </div>
      </div>
      {mostrarComprovante && dadosPedidoAtual && (
        <ModalComprovante dadosPedido={dadosPedidoAtual} />
      )}
    </div>
  );
};

export default Checkout;
