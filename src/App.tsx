import "./style.css";
import logoSenac from "./pic/Lux Logo.png"
import MenuBar from "./components/MenuBar";
import Router from "./Router";
import CarrinhoDrawer from "./components/CarrinhoDrawer";
import IconeLogin from "./components/IconeLogin";
import Footer from "./components/Footer";


function App() {




  
  return (
   <div className="body">
      <div className="corpo">
          <header className="cabecalho">
            <div className="logo">
              < img src={logoSenac} alt="logo" />
              <div className="item-usuario">
                <IconeLogin/>
              </div>
              <div className="item-carrinho">
              <CarrinhoDrawer />
              </div>
            </div>
            <MenuBar /> 
          </header>
      <Router />
      <div className="centered">
        </div><Footer/>
      </div>
   </div>
   
  ); 
}

export default App;
