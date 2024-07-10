
import { FC, useEffect, useState } from "react";
import "./index.css";
import { Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";
import EuUseImg from "../../pic/EuUse.png"


const Perfil : FC = () => {
    const [idCliente, setIdCliente] = useState<string>("");

  useEffect(() => {
    const idCliente = localStorage.getItem("idCliente") || "";
    setIdCliente(idCliente);
  }, []);


  

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
    window.location.href =(`/home`);
    
}



    return (
      <div className="div-login">
        <div className="div-login-linha">
          <p>Bem-vindo ao seu perfil !</p>
      </div>
      <Avatar src={EuUseImg} className="avatar-center" />
        <List  
          className="list-perfil" 
          aria-label="mailbox folders">
      <ListItem>
        < ListItemText primary={
                <a 
                    href={`editarclientes`} 
                    className="link-meus-dados"
                    >Meus Dados
                </a>} 
        />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={
                <a
                    href={`meuspedidos/carregar/${idCliente}`}
                    className="link-meus-pedidos"
                    >Meus Pedidos
                </a>
        } />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary={
            <a
                href={`#`} 
                className="link-sair"
                onClick={onLogout}
                >Sair
            </a>
        } />
      </ListItem>
    </List>
    </div>
    )
}
export default Perfil;