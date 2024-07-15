import { Close, Delete, ShoppingCart } from "@mui/icons-material";
import { FC, useState, useEffect } from "react";
import "./index.css"
import { Badge, Box, Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import { addCarrinho, carregarCarrinho, obterQuantidadeCarrinho, removerItemCarrinho } from "../../store/CarrinhoStore/carrinhoStore";
import { ICarrinhoStore } from "../../store/CarrinhoStore/types";
import InputQuantidade from "../InputQuantidade";
import BotaoPadrao from "../BtnPadrao";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

    

const CarrinhoDrawer: FC = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [carrinho, setCarrinho] = useState<ICarrinhoStore[]>(carregarCarrinho());
    const [total, setTotal] = useState<number>(0);
    

    // Função para calcular o total do carrinho
    const calcularTotal = () => {
        let totalCalculado = 0;
        carrinho.forEach((item) => {
            totalCalculado += item.preco * item.quantidade;
        });
        setTotal(totalCalculado);
    };

    useEffect(() => {
        calcularTotal(); // Recalcular o total sempre que o carrinho for atualizado
    }, [carrinho]);

    const atualizarQuantidadeCarrinho = (item: ICarrinhoStore) => {
        const carrinhoAtualizado = addCarrinho(item);
        setCarrinho(carrinhoAtualizado);
    }

    const removerCarrinho = (id: number) => {
        const carrinhoAtualizado = removerItemCarrinho(id);
        setCarrinho(carrinhoAtualizado);
    }

    function alert(arg0: string) {
        throw new Error("Function not implemented.");
    }

    const finalizarCompra = () => {
        window.location.href = "/finalizar-compra";
    };

    

    return (
        <>
            <div className="carrinho" onClick={() => setOpenDrawer(true)}>
                <Badge
                    badgeContent={obterQuantidadeCarrinho()}
                    color="primary"
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                >
                    <ShoppingCart color="action" />
                </Badge>
            </div>
            <Drawer
                open={openDrawer}
                anchor="right"
                classes={{ paper: "tamanho-paper-drawer" }}
            >
                <Box paddingLeft={"10px"} paddingRight={"10px"}>
                    <Button
                        variant="text"
                        startIcon={<Close />}
                        onClick={() => setOpenDrawer(false)}
                    >
                        Fechar
                    </Button>
                </Box>
                <Box paddingLeft={"10px"} paddingRight={"10px"}>
                    {!carrinho?.length && (
                        <Box>
                            <Typography variant="body1">
                                <strong>Seu Carrinho está vazio. </strong>
                            </Typography>
                        </Box>
                    )}

                    <div className="titulo-carrinho">
                        <h5>Seu carrinho <MdAddShoppingCart style={{ fontSize: "1.2em" }} /></h5>
                    </div>

                    {carrinho?.map((c: ICarrinhoStore) => (
                        <Grid container alignItems="center" key={c.id}>
                            <Grid className="box-imagem" item>
                                <img className="imagem"  src={`${process.env.PUBLIC_URL}/${c.enderecoImagem}`} alt={c.nome} />
                            </Grid>
                            <Grid className="box-detalhes" item>
                                <Box>
                                    <strong style={{ color: "blue", fontSize: "1.1em" }}>{c.nome}</strong>
                                </Box>
                                <Box>
                                    <span style={{ color: "#888", fontSize: "0.9em" }}>Tamanho: {c.tamanho}</span>
                                </Box>
                                <Box>
                                    <strong style={{ color: "#888", fontWeight: "bold",  fontSize: "1em" }}>Preço: {c.preco}</strong>
                                </Box>
                                <Box style={{ color: "#888", marginTop: "8px" }}>
                                    <strong style={{ fontSize: "1.05em" }}>Subtotal: R$ {(c.preco * c.quantidade).toFixed(2).replace('.',',')}</strong>
                                </Box>
                            </Grid>
                            <Grid className="box-quantidade" item>
                                <InputQuantidade
                                    quantidade={c.quantidade}
                                    onChange={(quantidade: number) => {
                                        const carrinhoAtualizado: ICarrinhoStore = { ...c, quantidade };
                                        atualizarQuantidadeCarrinho(carrinhoAtualizado);
                                    }}
                                />
                            </Grid>
                            <Grid className="box-remover" item>
                                <IconButton onClick={() => removerCarrinho(c.id)}>
                                    <Delete color="error" />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <div className="total-carrinho">
                        <Box style={{  marginTop: "8px" }}>
                            <strong style={{ fontSize: "1.2em" }}>Total: R$ {(total).toFixed(2).replace('.',',')}</strong>
                        </Box>
                    </div>
                   
                    <div className="linha-separadora"></div>
                    <div className="btn-finalizar-compra-container">
                        <div 
                        className="btn-finalizar-compra">
                        
                            <BotaoPadrao
                                label="Finalizar compra"
                                onClick={() => {
                                    finalizarCompra();
                                }}
                            />
                        </div>
                    </div>
                </Box>
            </Drawer>
        </>
    );
}

export default CarrinhoDrawer;
