import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduto } from "./types";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import BotaoPadrao from "../../components/BtnPadrao";
import "./index.css"

const Produtos: FC = () => {
    const { categoria } = useParams();
    const [produtos, setProdutos] = useState<IProduto[]>([]);

    const carregarProdutos = async () => {
        console.log("Categoria: ", categoria);

        let url = "/produtos/carregar";

        if (categoria) {
            url = `/produto/categoria/${categoria}`;
        }

        const response = await apiGet(url);

        if (response.status === STATUS_CODE.OK) {
            console.log(response);
            setProdutos(response.data);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, [categoria]);

    const redirecionarDetalhesProduto = (idProduto: number) => {
        if (idProduto) {
            window.location.href = `/produtos/detalhes/${idProduto}`;
        }
    };

    return (
        <>
            <div className="produtos-header">
                <h1>{categoria ? `Produtos da Categoria: ${categoria}` : 'Todos os Produtos'}</h1>
                <p>Encontre os melhores produtos aqui. Selecione um produto para mais detalhes e opções de compra.</p>
            </div>
            {produtos.length ? (
                <div className="container-produtos">
                    {produtos.map((produto: IProduto) => (
                        <div className="produto" key={produto.id}>
                            <a className="produto-imagem" href={`/produtos/detalhes/${produto.id}`}>
                                <img src={`/${produto.enderecoImagem}`} alt={produto.nome} />
                            </a>
                            <div className="produto-nome">
                                <p>{produto.nome}</p>
                            </div>
                            <div className="produto-preco">
                                <p>R$ {produto.preco}</p>
                                <div>
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
        </>
    );
};

export default Produtos;


















