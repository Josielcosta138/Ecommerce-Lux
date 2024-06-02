import { FC, useState } from "react";
import "./index.css";
import { Popover } from "@mui/material";

const categories = [
  {
    name: "Categorias",
    subcategories: ["Camisetas", "Feminino", "Masculino" ,"Vestidos", "Jeans"],
  },
];

const MenuBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLAnchorElement);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <div className="menu">
      <ul>
        <li><a href="/home">Home</a></li>
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
          >
            <div className="submenu">
              {categories[0].subcategories.map((subcategory, index) => (
                <a key={index} href={`/produtos/categoria/${subcategory.toLowerCase()}`}>{subcategory}</a>
              ))}
            </div>
          </Popover>
        </li>
        <li><a href="/sobre">Sobre</a></li>
      </ul>
    </div>
  );
};

export default MenuBar;
