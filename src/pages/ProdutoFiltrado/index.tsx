import { FC, useEffect, useState } from "react";
import  "./index.css";
import { IProduto } from "./types";
import { PiPants } from "react-icons/pi";
import { useParams } from "react-router-dom";
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import BotaoPadrao from "../../components/BtnPadrao";



const ProdutosFiltro: FC = () => {
    const { nomeProduto } = useParams();
    const [produtosFiltrado, setProdutosFiltrado] = useState<IProduto[]>(); 


    const filtrarProdutos = async () => {
        const response = await apiGet(`/produtos/carregar/filtrarprodutos/${nomeProduto}`);
        if (response.status === STATUS_CODE.OK) {
            setProdutosFiltrado(response.data);
        }
        
    }
    useEffect(() => {
        filtrarProdutos();   
    }, []);

    const redirecionarDetalhesProduto = (idProduto: number) => {
        if (idProduto) {
          window.location.href = `produtos/detalhes/${idProduto}`;
        }
      };


    return <>

    <div className="titulo-descricao">
            <h2 className="titulo-categoria">Resultado da pesquisa : {nomeProduto}</h2>
            <p className="descricao-categoria">
              Confira nossa seleção exclusiva de sua pesquisa de diversas categorias e
              estilos. <PiPants style={{ fontSize: '24px', marginLeft: '8px', marginBottom: '-5px' }}/>
            </p>
        </div>
      <div className="container">
        {produtosFiltrado?.length ? (
          <div className="grid-produtos">
            {produtosFiltrado.map((produtosFiltrado: IProduto) => (
              <div key={produtosFiltrado.id} className="produto">
                <a
                  className="produto_imagem"
                  href={`/produtos/detalhes/${produtosFiltrado.id}`}
                >
                  {produtosFiltrado?.enderecoImagem && <img src={`/${produtosFiltrado.enderecoImagem}`} alt={produtosFiltrado.nome} />}
                </a>
                <div className="produto_detalhes">
                  <div className="produto_nome">
                    <p>{produtosFiltrado.nome}</p>
                  </div>
                  <div className="produto_categoria">
                    <p>
                      <strong>{produtosFiltrado.descricao}</strong>
                    </p>
                  </div>
                  <div className="produto_tamanho">
                    <p>{produtosFiltrado.tamanho}</p>
                  </div>
                  <div className="produto_preco">
                    <p className="preco-atual-calca">R$ {produtosFiltrado.preco}</p>
                    {produtosFiltrado.precoAntigo && (
                      <p className="preco-antigo">R$ {produtosFiltrado.precoAntigo}</p>
                    )}
                  </div>
                  <div className="produto_botao">
                    <BotaoPadrao
                      label="Comprar"
                      onClick={() => redirecionarDetalhesProduto(produtosFiltrado.id)}
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

}
export default ProdutosFiltro;