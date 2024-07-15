import React, { FC, useEffect, useRef, useState } from "react";
import { carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import "./index.css";
import ModalComprovante from "../ModalComprovante";
import { STATUS_CODE, apiGet, apiPost } from "../../api/RestClient";
import { Alert, Box, Button, Checkbox, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format, formatDate, parse, parseISO } from "date-fns";
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';





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
  const [dadosBoleto, setDadosBoleto] = useState<{ pagador: string, valor: string, vencimento: string } | null>(null);
  const carrinho: ItemCarrinho[] = carregarCarrinho() as ItemCarrinho[];
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [formaPagamento, setFormaPagamento] = useState<string>();
  const [idCliente, setIdCliente] = useState<string>("");
  const [enderecoId, setEnderecoId] = useState<number | null>(null);
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [idClienteStorage, setIdClienteStorage] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [boletoImage, setBoletoImage] = useState<string | null>(null);
  const boletoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Leitura das informações do localStorage
    const nomeCliente = localStorage.getItem("nomeCliente") || "";
    const emailCliente = localStorage.getItem("emailCliente") || "";
    const idCliente = localStorage.getItem("idCliente") || "";

    setNome(nomeCliente);
    setEmail(emailCliente);
    setIdCliente(idCliente);
    atualizarEndereco();
  }, []);




  const atualizarEndereco = async () => {

    try {

      const idClienteLocal = localStorage.getItem("idCliente") || "";
      console.log('id cliente local', idClienteLocal);

      const responseEnderecos = apiGet(`enderecos/carregaEnderecosIdCliente/${idClienteLocal}`);

      if ((await responseEnderecos).status === STATUS_CODE.OK && (await responseEnderecos).data.length > 0) {
        try {
          const dadosCliente = (await responseEnderecos).data[0].clientes_id;
          const formattedDate = (dadosCliente.dataNascimento);
          const formatData = (inputDate: string) => {
            const date = parseISO(formattedDate);
            return format(date, 'dd/MM/yyyy');
          }

          setEnderecos((await responseEnderecos).data || []);
        } catch (error) {
          console.error("Erro ao carregar dados do cliente e endereços:", error);
        }

      } else {
        console.error("Nenhum endereço encontrado para o cliente.");
      }
    } catch (error) {
      console.error("Erro ao carregar o endereço:", error);
      alert("Erro ao carregar o endereço.");
    }


    console.log("Ícone de atualizar clicado!");
  };





  const handleFinalizarCompra = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enderecoId === null) {
      alert("Selecione um endereço!");
      return;
    }



    const dataPedido = new Date().toISOString().split('T')[0];
    const clienteId = parseInt(idCliente, 10);

    const formaPagamentoMap: { [key: string]: number } = {
      "cartaoCredito": 3,
      "cartaoDebito": 3,
      "pix": 2,
      "boleto": 1
    };


    if (formaPagamento === undefined || !(formaPagamento in formaPagamentoMap)) {

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
          <Alert severity="info" sx={{ mb: 2 }}>Selecione uma forma de pagamento!</Alert>
        </Box>
      </Modal>


      return;
    }

    const formaPagamentoId = formaPagamentoMap[formaPagamento];

    const itensPedido = carrinho.map(item => ({
      produto: { id: item.id },
      quantidade: item.quantidade,
      preco: item.preco,
    }));

    console.log('Id endereco: ' + enderecoId)


    const dadosPedido = {
      dataPedido,
      cliente: nome,
      totalPedido: parseFloat(calcularTotal()),
      clientesId: clienteId,
      enderecoId: enderecoId,
      formaPagamentoId,
      itensPedido,
    };

    if (formaPagamento === "boleto") {
      const dataAtual = new Date();
      const dataVencimento = new Date(dataAtual.getTime() + 20 * 24 * 60 * 60 * 1000); // Adiciona 20 dias
      const dataVencimentoFormatada = dataVencimento.toISOString().split('T')[0]; // Formata no formato YYYY-MM-DD
      const novosDadosBoleto = {
        pagador: dadosPedido.cliente,
        valor: dadosPedido.totalPedido.toFixed(2),
        vencimento: dataVencimentoFormatada,
      };
      setDadosBoleto(novosDadosBoleto);
      gerarBoleto(novosDadosBoleto);
    }




    const limparCarrinho = () => {
      localStorage.removeItem("carrinho");
    };


    try {
      const response = apiPost("pedidovenda/criar", dadosPedido);
      if ((await response).status === STATUS_CODE.CREATED) {
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

  const codigoPix = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
  const conteudoPix = `00020126360014BR.PIX0114${codigoPix}02152040000`;


  const gerarBoleto = (dadosBoleto: { pagador: string, valor: string, vencimento: string }) => {
    if (boletoRef.current) {
      html2canvas(boletoRef.current).then((canvas) => {
        const img = canvas.toDataURL('image/png');
        setBoletoImage(img);
      });
    }
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
            {/* Gerando o QR Code */}
            <QRCode
              value={conteudoPix}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
              className="qrcode-pix"
            />
            <p>Código Pix: {codigoPix}</p>
          </div>
        );



      case "boleto":
        return (
          <div className="pagamento-detalhes">
            <h3>Boleto</h3>
            {dadosBoleto && (
              <div ref={boletoRef}>
                <div className="boleto-content">
                <img src={boletoImage || "https://via.placeholder.com/300x150?text=Boleto"} alt="Boleto" className="boleto-image" />

                <div className="boleto-details">
                  <p><strong>Pagador:</strong> {dadosBoleto.pagador}</p>
                  <p><strong>Valor:</strong> R$ {dadosBoleto.valor}</p>
                  <p><strong>Vencimento:</strong> {format(parseISO(dadosBoleto.vencimento), 'dd/MM/yyyy')}</p>
                  {boletoImage && <img src={boletoImage} alt="Boleto" />}
                </div>
                <div className="boleto-description">
                  <p>Certifique-se de pagar o boleto antes da data de vencimento para evitar multas ou juros. Se tiver alguma dúvida, entre em contato conosco.</p>
                </div>
              </div>
              </div>
            )}
          </div>
        );
      default:
        return <div>Escolha uma forma de pagamento.</div>;
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h1>Confirme seus dados</h1>
        <form onSubmit={handleFinalizarCompra}>
          <h2>Informações do Cliente</h2>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
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



          <h2>Endereço</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Selecionar</TableCell>
                  <TableCell>Cidade</TableCell>
                  <TableCell>Bairro</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Endereço</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enderecos.map((endereco) => (
                  <TableRow key={endereco.id}>
                    <TableCell>
                      <Checkbox
                        checked={enderecoId === endereco.id}
                        onChange={() => setEnderecoId(enderecoId === endereco.id ? null : endereco.id)}
                      />
                    </TableCell>
                    <TableCell>{endereco.cidade}</TableCell>
                    <TableCell>{endereco.bairro}</TableCell>
                    <TableCell>{endereco.estado}</TableCell>
                    <TableCell>{endereco.rua}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


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
