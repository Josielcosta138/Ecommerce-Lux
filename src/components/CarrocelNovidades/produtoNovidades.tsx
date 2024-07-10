// Importações necessárias
import React from 'react';
import Slider from 'react-slick'; // Importando o Slider do react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import BotaoPadrao from "../../components/BtnPadrao";
import { IProduto } from '../../pages/Produtos/types';

const ProdutosNovidades : FC = () => {
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="produtos-novidades-banner">
            <Slider {...settings} className="produtos-novidades-slider">
                {produtos.map((produto: IProduto) => (
                    <div key={produto.id} className="produto-banner">
                        <a className="produto_imagem" href={`/produtos/detalhes/${produto.id}`}>
                            <img src={produto.enderecoImagem} alt={produto.nome} />
                        </a>
                        <div className="produto_nome">
                            <p>{produto.nome}</p>
                        </div>
                        <div className="produto_preco">
                            <p className="preco-atual">R$ {produto.preco}</p>
                            {produto.precoAntigo && (
                                <p className="preco-antigo">R$ {produto.precoAntigo}</p>
                            )}
                        </div>
                        <div>
                            <BotaoPadrao label="Comprar" onClick={() => redirecionarDetalhesProduto(produto.id)} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProdutosNovidades;
