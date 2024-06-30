import { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";
import MenuInicio from "./pages/MenuInicio";
import ProdutosDetalhe from "./pages/ProdutosDetalhes";
import Calcas from "./components/Categorias/Calça";
import Camisas from "./components/Categorias/Camisas";
import Jaquetas from "./components/Categorias/Jaquetas";
import Acessórios from "./components/Categorias/Acessórios";
import FinalizarCompra from "./pages/FinalizarCompra";
import Checkout from "./components/Checkout";
import Clientes from "./pages/Clientes";
import MeusPedidos from "./pages/MeusPedidos";

const Router : FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home />} index/>
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/sobre" element={<Sobre /> }/>
                <Route path="/menuInicio" element={<MenuInicio />}  />
                <Route path="/produtos/detalhes/:codigoProduto" element={<ProdutosDetalhe/>} />
                <Route path="/calcas" element={<Calcas /> }/>
                <Route path="/camisas" element={<Camisas /> }/>
                <Route path="/jaquetas" element={<Jaquetas /> }/>
                <Route path="/acessorios" element={<Acessórios /> }/>
                <Route path="/finalizar-compra" element={<FinalizarCompra /> }/>
                <Route path="/checkout" element={<Checkout /> }/>
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/meuspedidos/carregar/:id" element={<MeusPedidos />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;