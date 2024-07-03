import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduto } from "./types";
// import { STATUS_CODE, apiGet } from "../../api/RestClient";
// import BotaoPadrao from "../../components/BtnPadrao";
import "./index.css"
import { STATUS_CODE, apiGet } from "../../../api/RestClient";
import BotaoPadrao from "../../BtnPadrao";

const Camisas : FC = () => {
    const { categoria } = useParams()
    const [ produtos, setProdutos ] = useState<IProduto[]>([])

    const carregarProdutos = async() => {
        console.log("Categoria: ", categoria)

        let url= "/produtos/carregar"

        if (categoria) {
            url= `/produto/categoria/${categoria}`
        }

        const response = await apiGet(url)

        if (response.status === STATUS_CODE.OK) {
            console.log(response)
            setProdutos(response.data)
        }
    }

    useEffect(() => {
        carregarProdutos();
    },[])

    const redirecionarDetalhesProduto = (idProduto: number) => {
        if (idProduto) {
            window.location.href= `/produtos/detalhes/${idProduto}`
        }
    }

    return <>
        {produtos?.length ? <>
            <div className="container">
                {produtos.map((produto: IProduto) => {
                    return <>
                        <div className="produto">
                            <a className="produto-imagem" href={`produtos/detalhes/${produto.id}`}> 
                                <img src={`/${produto.enderecoImagem}`} />
                            </a>
                            <div className="produto-nome">
                                <p>{produto.nome}</p>
                            </div>
                            <div className="produto-preco">
                                <p>R$ {produto.preco}</p>
                                <div>
                                    <BotaoPadrao label="Comprar" onClick={() =>{
                                        redirecionarDetalhesProduto((produto.id))
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </>
                })}

            </div>
        </> : <div>Protutos-Teste</div>
        }

    </>
}
export default Camisas;