// Importações necessárias
import React from 'react';
import imagemBanner1 from '../../pic/bannerLuxRamon.jpg';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'; 

const BannerPageNovidades = () => {

    return (
        <div className="banner-novidades">
                <div className="imagem-banner">
                <img src={imagemBanner1} alt='Novidades' />
                </div>
        </div>
    );
};

export default BannerPageNovidades;
