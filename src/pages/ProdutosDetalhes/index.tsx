import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import "./index.css";
import { IProdutoDetalhe } from "./types";
import BotaoPadrao from "../../components/BtnPadrao";
import InputQuantidade from "../../components/InputQuantidade";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import { addCarrinho, carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import ConfirmarModal from "../../components/ConfirmarModal";
import { Alert, Box, Modal } from "@mui/material";

const ProdutosDetalhe: FC = () => {
  const { codigoProduto } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<IProdutoDetalhe>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [quantidadeProdutoValidar, setQuantidadeProdutoValidar] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const carrinho: ICarrinhoStore[] = carregarCarrinho();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    apiGet(`/produtosestoque/carregarProdutoEstoqueIdProduto/${codigoProduto}`).then((response) => {
      if (response.status === STATUS_CODE.OK) {
        setQuantidadeProdutoValidar(response.data.quantidade);
        let qnt = response.data.quantidade;
        localStorage.setItem(`quantidadeProduto_${codigoProduto}`, qnt.toString());
      }
    });

    apiGet(`/produtos/carregar/${codigoProduto}`).then((response) => {
      if (response.status === STATUS_CODE.OK) {
        setProduto(response.data);

        const carrinhoItem = carrinho.find((c: ICarrinhoStore) => c.id === response.data.id);
        if (carrinhoItem) {
          setQuantidadeProduto(carrinhoItem.quantidade);
        }
      }
    });
  }, [codigoProduto]); //carrinho

  const handleConfirmar = () => {
    if (produto) {
      const carrinhoItem: ICarrinhoStore = { ...produto, quantidade: quantidadeProduto || 0 };
      addCarrinho(carrinhoItem);
      setOpenModal(false);
      setOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
     
    }

  };

  return (
    <>
      <div className="conteiner-produto">
        <div className="produto-detalhe">
          <div className="imagem-produto">
            {produto?.enderecoImagem && <img src={`/${produto.enderecoImagem}`} alt={produto.nome} />}
          </div>
          <div className="dados-produto">
            <div className="nome-produto">{produto?.nome}</div>
            <hr />
            <div className="codigo-produto">{`Código produto: ${produto?.codigo}`}</div>
            <div className="preco-produto">
              <div className="preco">{`Preço R$: ${produto?.preco}`}</div>
              <div className="categoria">{`Categoria: ${produto?.categoria === 'ACESSORIOS' ? 'Combos' : produto?.categoria}`}</div>
              <div className="tamanho">{`Tamanho: ${produto?.tamanho}`}</div>
              <div className="descricao">{`Descrição: ${produto?.descricao}`}</div>
              <div className="quantidade">{`Quantidade disponível: ${quantidadeProdutoValidar}`}</div>

              <div className="tabela-tamanhos">
                <h3>Tabela de Tamanhos</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Tamanho</th>
                      <th>Busto</th>
                      <th>Cintura</th>
                      <th>Quadril</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>P</td>
                      <td>82-86 cm</td>
                      <td>66-70 cm</td>
                      <td>90-94 cm</td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>87-91 cm</td>
                      <td>71-75 cm</td>
                      <td>95-99 cm</td>
                    </tr>
                    <tr>
                      <td>G</td>
                      <td>92-96 cm</td>
                      <td>76-80 cm</td>
                      <td>100-104 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <hr />
            <div className="botao-produto">
              <InputQuantidade
                quantidade={quantidadeProduto}
                onChange={(quantidade: number) => setQuantidadeProduto(quantidade)}
              />
              <BotaoPadrao
                label="Adicionar ao carrinho"
                onClick={() => {
                  if (quantidadeProdutoValidar > 0 && quantidadeProdutoValidar >= quantidadeProduto) {
                    setOpenModal(true);
                    setAlertMessage(null);
                  } else {
                    setAlertMessage("Quantidade insuficiente.");
                    setTimeout(() => {
                      setAlertMessage(null);
                    }, 3000);
                  }
                }}
              />
              {quantidadeProdutoValidar <= 0 && (
                <button className="botao-indisponivel" disabled>
                  Estoque indisponível
                </button>
              )}
            </div>
            <br />
            {alertMessage && (
              <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
                <Alert variant="filled" severity="error" sx={{ mb: 2 }}>  {alertMessage}</Alert>
              </Box>

            )}

          </div>
        </div>
        <div className="avaliacoes-produto">
          <h2>Avaliações dos Clientes</h2>
          <div className="avaliacao">
            <p><strong>Cliente 1:</strong> Excelente produto!</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
          <div className="avaliacao">
            <p><strong>Cliente 2:</strong> Muito bom, recomendo.</p>
            <p>⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      <ConfirmarModal
        titulo="Adicionar ao Carrinho"
        mensagem="Confirmar adição de produto ao carrinho"
        open={openModal}
        onCancelar={() => setOpenModal(false)}
        onConfirmar={handleConfirmar}
      />



      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
          <Alert variant="filled" severity="success" sx={{ mb: 2 }}>Seu produto foi adicionado ao carrinho!</Alert>
        </Box>
      </Modal>



    </>
  );
};

export default ProdutosDetalhe;
