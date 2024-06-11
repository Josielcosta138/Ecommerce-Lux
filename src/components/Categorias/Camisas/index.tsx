import { FC, useEffect, useState } from "react";
// import { STATU_CODE, apiGet } from "../../api/RestClient";
// import { IProduto } from "../types";
// import BotaoPadrao from "../../components/BtnPadrao";
import { CircularProgress, LinearProgress } from "@mui/material";
import { IProduto } from "../../../pages/Home/types";
import { STATU_CODE, apiGet } from "../../../api/RestClient";
import BotaoPadrao from "../../BtnPadrao";

const Camisas: FC = () => {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const carregaProdutos = async () => {
        try {
            const response = await apiGet("/produtos/categoria/camisas");
            if (response.status === STATU_CODE.OK) {
                setProdutos(response.data);
            }
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregaProdutos();
    }, []);

    const redirecionarDetalhesProduto = (idProduto: number) => {
        if (idProduto) {
            window.location.href = `/produtos/detalhes/${idProduto}`;
        }
    };

    return (
        <>
            {loading ? (
                <div className="carregar-produtos">
                    <strong>Por favor, aguarde enquanto carregamos as melhores opções de moda...</strong>
                    <div className="progress-container">
                        <LinearProgress />
                    </div>
                </div>
            ) : (
                <>
                    <div className="container">
                        {produtos.map((produto: IProduto) => (
                            <div className="produto" key={produto.id}>
                                <a className="produto_imagem" href={`/produtos/detalhes/${produto.id}`}>
                                    <img src={produto.imagemPequena} alt={produto.nome} />
                                </a>
                                <div className="produto_nome">
                                    <p>{produto.nome}</p>
                                </div>
                                <div className="produto_categoria">
                                    <p><strong>{produto.categoria}</strong></p>
                                </div>
                                <div className="produto_preco">
                                    <p>R$ {produto.preco}</p>
                                    <div className="produto_preco_desconto">
                                        <p>R$ -10,00</p>
                                    </div>
                                </div>
                                <div>
                                    <BotaoPadrao
                                        label="Comprar"
                                        onClick={() => redirecionarDetalhesProduto(produto.id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Camisas;
