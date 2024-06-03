import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, STATU_CODE } from "../../api/RestClient";
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

    useEffect(() => { //só executa quando a pág é aberta
        console.log('>>>', codigoProduto);

        //  apiGet(`/produtos/${codigoProduto}`).then((response) => { endPointProfessor
        apiGet(`/produtos/carregar/${codigoProduto}`).then((response) => {
            if (response.status === STATU_CODE.OK) {
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
                    <img src={produto?.imagemGrande} />
                </div>
                <div className="dados-produto">
                    <div className="nome-produto">{produto?.nome}</div>
                    <hr />
                    <div className="codigo-produto">{`Codigo produto: ${produto?.codigoProduto}`}</div>
                    <div className="preco-produto">
                        <div className="preco">{`Preço R$: ${produto?.preco}`}</div>
                    </div>
                    <div className="botao-produto">
                        <InputQuantidade 
                            quantidade={quantidadeProduto || 0}
                            onChange={(quantidade : number) =>{
                                setQuantidadeProduto(quantidade);
                            }}    
                        />
                        <BotaoPadrao 
                            label="Adicionar"
                            onClick={() =>{
                                setOpenModal(true);
                            }}/>
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