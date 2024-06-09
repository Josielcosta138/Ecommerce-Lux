import { FC } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";
import MenuInicio from "./pages/MenuInicio";
import ProdutosDetalhe from "./pages/ProdutosDetalhes";

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
            </Routes>
        </BrowserRouter>
    );
}
export default Router;