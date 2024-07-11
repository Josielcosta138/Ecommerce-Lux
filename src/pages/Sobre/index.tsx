import React from "react";
import "./index.css";
import josiel from '../../pic/josielPerfil.jpg';
import ramon from '../../pic/Ramonzinho.jpg';


const Sobre: React.FC = () => {
  return (
    <div className="sobre-container">
      <div className="sobre-banner">
        <h1>Sobre a Lux</h1>
      </div>
      <div className="sobre-conteudo">
        <section className="sobre-empresa">
          <h2>Quem Somos</h2>
          <p>
            "Na LUX, quebramos barreiras e redefinimos o impossível. Somos a escolha dos audazes, dos destemidos, daqueles que vivem no limite. Cada peça nossa é uma declaração de liberdade, um desafio à monotonia. Com anos de inovação e ousadia, nossa missão é proporcionar uma experiência de compra que vai além do excepcional – queremos te deixar sem fôlego. Vem com a gente, vista a LUX e viva intensamente!"
          </p>
        </section>
        <section className="missao-visao-valores">
          <div className="missao">
            <h3>Missão</h3>
            <p>
              Nossa missão é fornecer produtos de alta qualidade que atendam às necessidades e desejos dos nossos clientes, promovendo uma experiência de compra única e satisfatória.
            </p>
          </div>
          <div className="visao">
            <h3>Visão</h3>
            <p>
              Ser reconhecida como a melhor opção de compra online, oferecendo uma variedade de produtos com excelência em atendimento e entrega.
            </p>
          </div>
          <div className="valores">
            <h3>Valores</h3>
            <ul>
              <li>Qualidade Sem Limites</li>
              <li>Excelência no atendimento</li>
              <li>Ética e transparência Radical</li>
              <li>Inovação Sem Fim</li>
              <li>Impacto Positivo no Meio Ambiente</li>
            </ul>
          </div>
        </section>
        <section className="nossa-equipe">
          <h2>Nosso Time</h2>
          <div className="equipe-lista">
            <div className="equipe-membro">
              <img src={josiel} alt="Josiel Costa" />
              <h4>Josiel Costa</h4>
              <p>Desenvolvedor - Full-Stack</p>
              <section className="sobre-contato">
                    <p>
                      <a  href="https://www.linkedin.com/in/josiel-costa-07b2aa140/" 
                          target="_blank" 
                          rel="noopener noreferrer">LinkedIn de Josiel Costa</a>
                    </p>
              </section>
            </div>
            <div className="equipe-membro">
              <img src={ramon} alt="Ramon B. J." />
              <h4>Ramon B. J.</h4>
              <p>Desenvolvedor - Front-End</p>
              <section className="sobre-contato">
                    <p>
                      <a  href="https://www.linkedin.com/in/ramonjoaquim1/" 
                          target="_blank" 
                          rel="noopener noreferrer">LinkedIn de Ramon B. J.</a>
                    </p>
              </section>
            </div>
          </div>
        </section>
        <section className="sobre-contato">
          <h2>Contato</h2>
          <p>
            Para mais informações, entre em contato conosco pelo e-mail: <a href="mailto:contato@empresa.com">contato@luxoficial.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Sobre;
