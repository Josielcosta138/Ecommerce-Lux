import { PersonOutline } from "@mui/icons-material";
import React, { FC, useState } from "react";
import  "./index.css";
import { Popover } from "@mui/material";
import Login from "../Login";
import { IClienteStore } from "../../store/ClienteStore/type";

const IconeLogin : FC = () => {
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    const[ancoraPopover, setAncoraPopover] = useState<HTMLDivElement | null>(null);
    
    const onClickLogin = (evento: React.MouseEvent<HTMLDivElement>) => {
        setOpenPopover((openPopover) => !openPopover);
        setAncoraPopover(evento.currentTarget); 
    }

    const onClosePopover = () => {
        setOpenPopover(false);
    }

    function setClienteStore(cliente: IClienteStore) {
        throw new Error("Function not implemented.");
    }

    return<>
        <div className="container-login" onClick={onClickLogin}>
            <div className="div-log">
            <PersonOutline color ="inherit" sx={{fontSize: 40}} />
            </div>
            <div className="div-usuario">
                <div className="texto-login">Olá visitantes</div>
                <div className="texto-login">Entre ou cadastre-se</div>
            </div>
        </div>
        <Popover 
            open={openPopover}
            onClose={onClosePopover}
            anchorEl={ancoraPopover}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}>
               <Login 
                     onClose={onClosePopover} 
                     onLogin={(cliente: IClienteStore) => {
                         setClienteStore(cliente);
                         onClosePopover()
                     }}
               />
        </Popover>
    </>
}
export default IconeLogin;

function onLogin(cliente: IClienteStore): void {
    throw new Error("Function not implemented.");
}
