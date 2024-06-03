// Importações necessárias
import React from 'react';
import imagemBanner1 from '../../pic/bannerSaoJoao.jpg';
import imagemBanner2 from '../../pic/Promo.jpg';
import imagemBanner3 from '../../pic/aquecer.jpg';
import Slider from 'react-slick'; // Importando o Slider do react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'; // Importando os estilos personalizados

const BannerPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

    };

    return (
        <div className="banner-ofertas-da-semana">
            <Slider {...settings}>
                <div className="imagem-banner">
                <img src={imagemBanner3} />
                </div>
                <div className="imagem-banner">
                    <img src={imagemBanner2} />
                </div>
                <div className="imagem-banner">
                    <img src={imagemBanner1} />
                </div>
            </Slider>
        </div>
    );
};

export default BannerPage;
