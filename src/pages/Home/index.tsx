import { FC, useEffect, useState } from "react";
import { STATUS_CODE, apiGet } from "../../api/RestClient";
import { IBtnProduto, IProduto } from "./types";
import "./index.css";
import BotaoPadrao from "../../components/BtnPadrao";
import { CircularProgress, LinearProgress } from "@mui/material";
import BannerPage from "../../components/BannerOfertas/index";
import { TbShoppingCartDollar } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import BannerPageNovidades from "../../components/BannerNovidades";
import BannerCarregar from "../../components/CarregarBannerParaListarProd";
import { FaShippingFast, FaPhoneAlt, FaRegSmile } from "react-icons/fa";
import grow from '../../pic/grow.png';
import redbull from '../../pic/Red-Bull-logo-design1-preview.jpg';
import nike from '../../pic/nikelogo.webp';
import luisviton from '../../pic/louis-vuitton-primary-logo.png';
import guici from '../../pic/gucii.png';
import quemsomos from '../../pic/quemsomos.png';

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

  const produtosNovidades = produtos.filter(produto => produto.categoria === 'NOVO');
  const produtosCombos = produtos.filter(produto => produto.categoria !== 'NOVO');


  return (
    <>
      {produtos.length ? (
        <>
          <div className="banner-ofertas-da-semana">
            <BannerPage />
          </div>

          <div className="combos-de-produtos">
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
            <h3>
              <strong>"Vista-se para Voar. Conquiste o Impossível com Lux."</strong>
            </h3>
          </div>

          <div className="banner-novidades-home">
            <BannerPageNovidades />
          </div>
          <h3>
              <strong>Novidades</strong>
              <IoNewspaperOutline style={{ fontSize: '24px', marginLeft: '8px' }} />
            </h3>
          <div className="novidades">
            <div className="container novidades-container">
              {produtosCombos.map((produto: IProduto) => (
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

          {/* Seção Quem Somos */}
          <div className="about-section">
            <h3>Quem Somos</h3>
            <div className="about-content">
              <a href=" "><img src={quemsomos} alt="Quem Somos" className="about-image" /></a>

              {/* <img src="/path/to/about-image.jpg" alt="Quem Somos" className="about-image" /> */}
              <div className="about-text">
                <h4>Lux - Somos mais do que uma marca;</h4>
                <p>
                  Somos uma filosofia de vida. Nossa missão é inspirar você a alcançar o seu melhor, vestindo estilo e conforto em cada passo do seu caminho. Cada peça que criamos é um convite para que você se mova com confiança, abrace seus desafios e conquiste novos horizontes. Porque você merece mais do que roupas; você merece uma experiência de vida.                </p>
              </div>
            </div>
          </div>

          {/* Seção Atendimento ao Cliente */}
          <div className="customer-service-section">
            <h3>Atendimento ao Cliente</h3>
            <div className="customer-service-container">
              <div className="customer-service">
                <FaPhoneAlt className="customer-service-icon" />
                <h4>Central de Atendimento</h4>
                <p>Entre em contato conosco pelo telefone: (48) 99847-2758</p>
              </div>
              <div className="customer-service">
                <FaRegSmile className="customer-service-icon" />
                <h4>Chat Online</h4>
                <p>Converse com nossos atendentes através do chat online disponível 24/7.</p>
              </div>
              <div className="customer-service">
                <FaShippingFast className="customer-service-icon" />
                <h4>Suporte por E-mail</h4>
                <p>Envie um e-mail para contato@lux.com e responderemos em até 24 horas.</p>
              </div>
            </div>
          </div>

          {/* Seção Depoimentos de Clientes */}
          <div className="testimonials-section">
            <h3>Depoimentos de Clientes</h3>
            <div className="testimonials-container">
              <div className="testimonial">
                <p>"Excelente atendimento e produtos de alta qualidade. Recomendo!"</p>
                <h4>Maria Silva</h4>
              </div>
              <div className="testimonial">
                <p>"Comprei e chegou tudo certinho, bem embalado. Adorei a experiência."</p>
                <h4>João Souza</h4>
              </div>
              <div className="testimonial">
                <p>"Sempre encontro o que preciso e com ótimos preços. Loja nota 10!"</p>
                <h4>Ana Costa</h4>
              </div>
            </div>
          </div>

          {/* Seção Marcas Parceiras */}
          <div className="brands-section">
            <h3>Marcas Parceiras</h3>
            <div className="brands-container">
              <a href="https://www.instagram.com/growjay_"><img src={grow} alt="Growjay" className="brand-logo" /></a>
              <a href="https://www.nike.com"><img src={nike} alt="Nike" className="brand-logo" /></a>
              <a href="https://eu.louisvuitton.com/eng-e1/homepage"><img src={guici} alt="Gucci" className="brand-logo" /></a>
              <a href="https://www.redbull.com"><img src={redbull} alt="Redbull" className="brand-logo" /></a>

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
