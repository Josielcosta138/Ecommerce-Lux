import React, { FC } from 'react';
import './index.css';
import boleto from '../../pic/boleto-logo.png';
import mastercard from '../../pic/mastercard-icon-2048x1587-tygju446.png';
import pix from '../../pic/Logo—pix_powered_by_Banco_Central_(Brazil,_2020).svg.webp';
import visa from '../../pic/visa.png';
import facebook from '../../pic/facebook.png';
import instagram from '../../pic/instagram.png';
import twitter from '../../pic/twiiter.png';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Sobre Nós</h4>
          <ul>
            <li><a href="/sobre">Nossa História</a></li>
            <li><a href="/contato">Contato</a></li>
            <li><a href="/termos">Termos de Uso</a></li>
            <li><a href="/privacidade">Política de Privacidade</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Atendimento ao Cliente</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/suporte">Suporte</a></li>
            <li><a href="/envioeentrega">Envio e Entrega</a></li>
            <li><a href="/devolucoes">Devoluções</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Siga-nos</h4>
          <div className="footer-social-media">
            <a href="https://www.facebook.com/"><img src={facebook} alt="Facebook" /></a>
            <a href="https://www.instagram.com/"><img src={instagram} alt="Instagram" /></a>
            <a href="https://twitter.com/"><img src={twitter} alt="Twitter" /></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Formas de Pagamento</h4>
          <div className="footer-payment-methods">
            <img src={visa} alt="Visa" className="payment-methods-icon" />
            <img src={mastercard} alt="Mastercard" className="payment-methods-icon" />
            <img src={boleto} alt="Boleto" className="payment-methods-icon" />
            <img src={pix} alt="Pix" className="payment-methods-icon" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Lux Oficial. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
