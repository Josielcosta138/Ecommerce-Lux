import { FC, useState } from "react";
import "./index.css";
import { Popover } from "@mui/material";
import React from "react";
import { apiGet } from "../../api/RestClient";

const categories = [
  {
    name: "Categorias",
    subcategories: [
      { name: "Calças", link: "/calcas" },
      { name: "Camisetas", link: "/camisas" },
      { name: "Jaquetas", link: "/jaquetas" },
      { name: "Conjuntos", link: "/conjutos" },
    ],
  },
];


const MenuBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
  const [produtoPesquisa, setProdutoPesquisa] = useState<string>("");

  // AÇÃO MENU CATEGORIAS
  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLAnchorElement);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };


  // PESQUISAS
  const filtrarProdutos =  (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      window.console.log(">>> método filtrar menuBar");
      window.location.href = `/produtos/carregar/filtrarprodutos/${produtoPesquisa}`
  }


  return (
    <><div className="search-bar">
    <form onSubmit={filtrarProdutos}>
      <input
        type="text"
        value={produtoPesquisa}
        onChange={(event) => setProdutoPesquisa(event.target.value)}
        placeholder="Pesquisar produtos..."
      />
      <button type="submit">Buscar</button>
    </form>
  </div>
      <div className="top-bar">
        Frete grátis para todo o Brasil
      </div>
      <div className="menu">
        <ul>
          <li><a href="/home">Página Inicial</a></li>
          <li><a href="/produtos">Produtos</a></li>
          <li onClick={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href="#">Categorias</a>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMouseLeave}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              disableRestoreFocus
            >
              <div className="submenu" onMouseLeave={handleMouseLeave}>
                {categories[0].subcategories.map((subcategory) => (
                  <a key={subcategory.name} href={subcategory.link}>{subcategory.name}</a>
                ))}
              </div>
            </Popover>
          </li>
          <li><a href="/sobre">Sobre</a></li>
        </ul>
      </div>
      
    </>
  );
};

export default MenuBar;
