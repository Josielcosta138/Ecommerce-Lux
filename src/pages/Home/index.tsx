import { FC, useEffect, useState } from "react";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { IBtnProduto, IProduto } from "./types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./index.css";
import BotaoPadrao from "../../components/BtnPadrao";
import BannerPage from "../../components/BannerOfertas/index";
import { TbShoppingCartDollar } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import BannerPageNovidades from "../../components/BannerNovidades";
import BannerCarregar from "../../components/CarregarBannerParaListarProd";
import { FaShippingFast, FaPhoneAlt, FaRegSmile } from "react-icons/fa";
import ProdutosNovidades from "../../components/CarrocelNovidades/produtoNovidades";
import { MdOutlineWorkHistory } from "react-icons/md";
import { BiHappyHeartEyes } from "react-icons/bi";


const Home: FC = () => {
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  const carregaProdutos = async () => {
    const response = await apiGet("/produtos/carregar/categoriacombo");
    if (response.status === STATUS_CODE.OK) {
      setProdutos(response.data);
    }
  };

  useEffect(() => {
    carregaProdutos();
  }, []);

  const redirecionarDetalhesProduto = (idProduto: number) => {
    if (idProduto) {
      window.location.href = `produtos/detalhes/${idProduto}`;
    }
  };


  return (
    <>
      {produtos.length ? (
        <>
          <div className="banner-ofertas-da-semana">
            <BannerPage />
          </div>

          <div className="combos-de-produtos" style={{ background: '#F2F2F2' }}>
            <h3>
              <strong>Combos de ofertas</strong>
              <TbShoppingCartDollar style={{ fontSize: '24px', marginLeft: '8px' }} />
            </h3>
          </div>

          <div className="container" >
            {produtos.map((produto: IProduto) => (
              <div key={produto.id} className="produto">
                <a className="produto_imagem" href={`/produtos/detalhes/${produto.id}`}>
                  <img src={produto.enderecoImagem} alt={produto.nome} />
                </a>
                <div className="produto_nome">
                  <p>{produto.nome}</p>
                </div>
                <div className="produto_categoria">
                  <p><strong>{produto.categoria === 'ACESSORIOS' ? 'Combos' : produto.categoria}</strong></p>
                </div>
                <div className="produto_tamanho">
                  <p>{produto.tamanho}</p>
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
          </div>
          <div className="combos-de-produtos">
            <h3 style={{ marginTop: '70px' }}>
              <strong>"Vista-se para Voar. Conquiste o Impossível com Lux."</strong>
            </h3>
          </div>

          <div className="banner-novidades-home">
            <BannerPageNovidades />
          </div>
          <div className="novidades" style={{ background: '#F2F2F2' }}>
            <h3>
              <strong>Novidades</strong>
              <IoNewspaperOutline style={{ fontSize: '24px', marginLeft: '8px' }} />
            </h3>
            <ProdutosNovidades />
            <h3>
              <strong >Clica e confira</strong>
              <BiHappyHeartEyes style={{ fontSize: '24px', marginLeft: '8px' }} />
            </h3>
            <ProdutosNovidades />
          </div>


          {/* Seção de Serviços */}
          <div className="services-section">
            <h3>Serviços</h3>
            <div className="services-container">
              <div className="service">
                <FaShippingFast className="service-icon" />
                <h4>Entrega Rápida</h4>
                <p>Receba seus produtos rapidamente em qualquer lugar do Brasil.</p>
              </div>
              <div className="service">
                <FaPhoneAlt className="service-icon" />
                <h4>Suporte 24/7</h4>
                <p>Nosso atendimento ao cliente está disponível 24/7 para ajudá-lo.</p>
              </div>
              <div className="service">
                <FaRegSmile className="service-icon" />
                <h4>Satisfação Garantida</h4>
                <p>Garantimos a sua satisfação com todos os nossos produtos.</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <BannerCarregar />
        </div>
      )}
    </>
  );
};

export default Home;
