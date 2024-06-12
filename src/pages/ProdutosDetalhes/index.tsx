import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, STATUS_CODE } from "../../api/RestClient";
import "./index.css"
import { IProdutoDetalhe } from "./types";
import BotaoPadrao from "../../components/BtnPadrao";
import InputQuantidade from "../../components/InputQuantidade";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import { addCarrinho, carregarCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { ShoppingCart } from "@mui/icons-material";
import ConfirmarModal from "../../components/ConfirmarModal";

const ProdutosDetalhe: FC = () => {
    const { codigoProduto } = useParams();
    const [produto, setProduto] = useState<IProdutoDetalhe>();
    const [botaoProdutos, setBotaoProdutos] = useState(false);
    const [quantidadeProduto, setQuantidadeProduto] = useState<number>(1);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const carrinho:ICarrinhoStore[] = carregarCarrinho();
    const [quantidadeProdutoValidar, setQuantidadeProdutoValidar] = useState<number>(0);
   


    useEffect(() => { 

        apiGet(`/produtosestoque/carregarProdutoEstoqueIdProduto/${codigoProduto}`).then((response) =>  {
            if (response.status === STATUS_CODE.OK) {

                setQuantidadeProdutoValidar(response.data.quantidade);
                console.log('quantidade do Produto >>>', response.data.quantidade);
            }


        });


        //  apiGet(`/produtos/${codigoProduto}`).then((response) => { endPointProfessor
        apiGet(`/produtos/carregar/${codigoProduto}`).then((response) => {
            if (response.status === STATUS_CODE.OK) {
                console.log('>>>', response.data);
                setProduto(response.data);

                const carrinhoItem = carrinho.find((c: ICarrinhoStore) => c.id === response.data.id);
                
                if (carrinhoItem) {
                    setQuantidadeProduto(carrinhoItem.quantidade);
                }
            }

        });

    }, []);

    return <>
        <div className="conteiner-produto">
            <div className="produto-detalhe">
                <div className="imagem-produto">
                {produto?.enderecoImagem && (
                        <img src={`/${produto.enderecoImagem}`} />
                    )}
                </div>
                <div className="dados-produto">
                    <div className="nome-produto">{produto?.nome}</div>
                    <hr />
                    <div className="codigo-produto">{`Codigo produto: ${produto?.codigo}`}</div>
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
                            quantidade={quantidadeProduto || 0 && quantidadeProduto >= quantidadeProdutoValidar}
                            onChange={(quantidade : number) =>{
                                setQuantidadeProduto(quantidade);
                            }}    
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
                                    <button 
                                        className="botao-indisponivel"
                                        disabled
                                    >Estoque indisponível
                                    </button>
                                )}
                        </div>
                        

                    <br /> 
                </div>
            </div>
        </div>
        <ConfirmarModal 
            titulo="Add Carrinho" 
            mensagem="Confirmar adição de produto ao carrinho" 
            open={openModal}  
            onCancelar={() =>{
                setOpenModal(false);
            }}
            onConfirmar={() =>{
                if (produto) {
                        const carrinhoItem : ICarrinhoStore ={...produto, quantidade: quantidadeProduto || 0}
                        addCarrinho(carrinhoItem);
                        window.location.href = "/home";
                    }
                    setOpenModal(false);

            }}/>
    </>
}

export default ProdutosDetalhe;