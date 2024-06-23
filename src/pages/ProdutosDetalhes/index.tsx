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

const ProdutosDetalhe: FC = () => {
  const { codigoProduto } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<IProdutoDetalhe>();
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
  const [quantidadeProdutoValidar, setQuantidadeProdutoValidar] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const carrinho: ICarrinhoStore[] = carregarCarrinho();

  useEffect(() => {
    apiGet(`/produtosestoque/carregarProdutoEstoqueIdProduto/${codigoProduto}`).then((response) => {
      if (response.status === STATUS_CODE.OK) {
        setQuantidadeProdutoValidar(response.data.quantidade);
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
  }, [codigoProduto, carrinho]);

  const handleConfirmar = () => {
    if (produto) {
      const carrinhoItem: ICarrinhoStore = { ...produto, quantidade: quantidadeProduto || 0 };
      addCarrinho(carrinhoItem);
      setOpenModal(false);
      window.location.reload();
      // navigate("/finalizar-compra"); // Redireciona para a página de finalização de compra
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
            </div>
            <hr />
            <div className="botao-produto">
              <InputQuantidade
                quantidade={quantidadeProduto}
                onChange={(quantidade: number) => setQuantidadeProduto(quantidade)}
              />
              <BotaoPadrao
                label="Adicionar"
                onClick={() => {
                  if (quantidadeProdutoValidar > 0) {
                    setOpenModal(true);
                  } else {
                    alert("Quantidade indisponível. Por favor, tente novamente em instantes.");
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
    </>
  );
};

export default ProdutosDetalhe;
