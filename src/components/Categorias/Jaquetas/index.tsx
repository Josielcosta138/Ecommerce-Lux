import { FC, useEffect, useState } from "react";
import "./index.css"
import { STATUS_CODE, apiGet } from "../../../api/RestClient";
import BotaoPadrao from "../../BtnPadrao";
import { IProduto } from "./types";
import { GiMonclerJacket } from "react-icons/gi";

const Calca: FC = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([])

  const carregarProdutos = async () => {
    const response = await apiGet(`produtos/carregar/todascategoria/${3}`);
    if (response.status === STATUS_CODE.OK) {
      setProdutos(response.data);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const redirecionarDetalhesProduto = (idProduto: number) => {
    if (idProduto) {
      window.location.href = `produtos/detalhes/${idProduto}`;
    }
  };


  return (
    <>
        <div className="titulo-descricao">
            <h2 className="titulo-categoria">Jaquetas</h2>
            <p className="descricao-categoria">
              Confira nossa seleção exclusiva de jaquetas de diversas categorias e
              estilos. <GiMonclerJacket style={{ fontSize: '24px', marginLeft: '8px', marginBottom: '-5px' }}/>
            </p>
        </div>
      <div className="container">
        {produtos?.length ? (
          <div className="grid-produtos">
            {produtos.map((produto: IProduto) => (
              <div key={produto.id} className="produto">
                <a
                  className="produto_imagem"
                  href={`/produtos/detalhes/${produto.id}`}
                >
                  <img src={produto.enderecoImagem} alt={produto.nome} />
                </a>
                <div className="produto_detalhes">
                  <div className="produto_nome">
                    <p>{produto.nome}</p>
                  </div>
                  <div className="produto_categoria">
                    <p>
                      <strong>{produto.descricao}</strong>
                    </p>
                  </div>
                  <div className="produto_tamanho">
                    <p>{produto.tamanho}</p>
                  </div>
                  <div className="produto_preco">
                    <p className="preco-atual-calca">R$ {produto.preco}</p>
                    {produto.precoAntigo && (
                      <p className="preco-antigo">R$ {produto.precoAntigo}</p>
                    )}
                  </div>
                  <div className="produto_botao">
                    <BotaoPadrao
                      label="Comprar"
                      onClick={() => redirecionarDetalhesProduto(produto.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Aguarde, os produtos estão carregando.</div>
        )}
      </div>
    </>
  );
}
export default Calca;