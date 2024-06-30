import { PersonOutline } from "@mui/icons-material";
import React, { FC, useState, useEffect } from "react";
import "./index.css";
import { Button, Popover } from "@mui/material";
import Login from "../Login";
import { IClienteStore } from "../../store/ClienteStore/type";
import { addClienteStore, getClienteStore, clearClienteStore } from "../../store/ClienteStore/clienteStore";
import { RiShoppingBag4Fill } from "react-icons/ri";



const IconeLogin: FC = () => {
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    const [ancoraPopover, setAncoraPopover] = useState<HTMLDivElement | null>(null);
    const [clienteStore, setClienteStore] = useState<IClienteStore | null>(null);


    useEffect(() => {
        const storedCliente = getClienteStore();
        if (storedCliente) {
            setClienteStore(storedCliente);
        }
    }, []);

    const onClickLogin = (evento: React.MouseEvent<HTMLDivElement>) => {
        setOpenPopover((openPopover) => !openPopover);
        setAncoraPopover(evento.currentTarget);
    }

    const onClosePopover = () => {
        setOpenPopover(false);
    }

    const handleLogin = (cliente: IClienteStore) => {
        addClienteStore(cliente);
        setClienteStore(cliente);
        console.log("Cliente armazenado: ", cliente);
    }

    const handleLogout = () => {
        clearClienteStore();
        setClienteStore(null);
        window.location.reload();
    }



    const redirecionamentoDePedidos = () => {
        if (clienteStore?.id) {
            window.location.href =(`/meuspedidos/carregar/${clienteStore.id}`);
        }
    }




    return (
        <>
            <div className="container-login" onClick={onClickLogin}>
                <div className="div-log">
                    <PersonOutline color="inherit" sx={{ fontSize: 40 }} />
                </div>
                <div className="div-usuario">
                    <div className="texto-login">Olá, {clienteStore?.nome ? clienteStore.nome : "Visitante"}</div>
                    <div className="texto-login">{clienteStore?.nome ? "Seja bem-vindo" : "Entre ou cadastre-se"}</div>
                    {clienteStore?.id && (
                        <div className="div-pedidos">
                         <span 
                                onClick={redirecionamentoDePedidos} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#1E90FF',  
                                    textDecoration: 'underline', 
                                    cursor: 'pointer', 
                                    fontSize: '16px' 
                                }}
                            >
                                <RiShoppingBag4Fill style={{ marginRight: '12px', fontSize: '30px' }} />  {/* Ícone ao lado do texto */}
                                Meus pedidos
                            </span>
                    </div>
                )}
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
                        handleLogin(cliente);
                        onClosePopover();
                    }}
                    clienteLogado={clienteStore}
                    onLogout={handleLogout}
                />
            </Popover>
        </>
    );
}

export default IconeLogin;
