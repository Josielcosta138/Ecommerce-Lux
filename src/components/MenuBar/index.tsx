import { FC, useState } from "react";
import "./index.css";
import { Popover } from "@mui/material";

const categories = [
  {
    name: "Categorias",
    subcategories: [
      { name: "Calças", link: "/calcas" },
      { name: "Camisas", link: "/camisas" },
      { name: "Jaquetas", link: "/jaquetas" },
      { name: "Acessórios", link: "/acessorios" },
    ],
  },
];

const MenuBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLAnchorElement);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Redirecionar para a página de resultados de pesquisa com a query
    window.location.href = `/search?query=${searchQuery}`;
  };

  return (
    <><div className="search-bar">
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
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
          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
