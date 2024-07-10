import { FC, useEffect, useState } from "react";
import "./index.css";
import { Alert, Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { IClienteStore } from "../../store/ClienteStore/type";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { addClienteStore, clearClienteStore } from "../../store/ClienteStore/clienteStore";
import Perfil from "../Perfil";
import { error } from "console";

interface LoginProperties{
    onClose: () => void,
    onLogin: (cliente : IClienteStore) => void;
    clienteLogado: IClienteStore | null;
    onLogout: () => void;
}

const Login : FC<LoginProperties> = ({
    onClose,
    onLogin,
    clienteLogado,
    onLogout,
    
}) => {
    const [tipoSenha, setTipoSenha] = useState<boolean>(false)
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [errorMessage, setErrorMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    


    const onTipoSenha = () => {
        setTipoSenha(!tipoSenha)
    }


    const autenticarCliente = async () => {
        const data = {
            email: email,
            senha: senha
        }



        const response = await apiPost("/clientes/autenticar", data);
        if (response.status === STATUS_CODE.OK) {
            const dataResult = response.data;

            const cliente : IClienteStore = {
                id: dataResult.id,
                nome: dataResult.nome,
                email: dataResult.email,
            }

            addClienteStore(cliente);
            onLogin(cliente);

            const clienteJSON = localStorage.getItem("cliente");
                if (clienteJSON){
                    const idCliente = cliente.id || "";
                    localStorage.setItem("idCliente", idCliente.toString())
                }

                setErrorMessage("");
                setOpenAlert(false);

            return;
        }
        setErrorMessage("Por favor, verifique seu usuário e senha!");
        setOpenAlert(true);

        if (response.status === STATUS_CODE.UNAUTHORIZED) {
            setErrorMessage("Por favor, verifique seu usuário e senha!");
          } else {
            setErrorMessage("Erro na autenticação. Por favor, tente novamente.");
          }
          setOpenAlert(true);
    }



    


    return  (
        <>
            <div className="div-login">
                {!clienteLogado ? (
                    <>
                <div className="div-login-linha">
                    <TextField 
                        className="textfield-small"
                        // fullWidth
                        label="Email"
                        value={email}
                        onChange={(event) => {
                            if (event){
                                setEmail(event.target.value);
                            }
                        }}
                        InputProps={{
                            startAdornment: 
                            <>
                                <InputAdornment position="start">
                                    <AlternateEmail />
                                </InputAdornment>
                            </>
                        }}
                    />
                </div>
                <div className="div-login-linha">
                    <TextField 
                        className="textfield-small"
                        label="Senha"
                        type={tipoSenha ? "text" : "password"}
                        value={senha}
                        onChange={(event) => {
                            if (event){
                                setSenha(event.target.value);
                            }
                        }}
                        InputProps={{
                            startAdornment: 
                            <>
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            </>,
                            endAdornment: 
                            <>
                                <IconButton onClick={onTipoSenha}>
                                    {tipoSenha ? <VisibilityOff/> : <Visibility />}
                                </IconButton>
                            </>
                        }}
                    />
                </div>
                
                <div className="div-login-linha">
                    <Button onClick={onClose} style={{width:"50%"}}>Voltar</Button>
                    <Button 
                        style={{width:"30%"}} 
                        variant="contained"
                        onClick={() =>{
                            autenticarCliente();
                        }}
                        >Entrar
                    </Button>
                </div>
                <div className="div-login-linha-descricao">
                    <p>Não possui conta? <a href="/clientes/">Cadastre-se</a></p>
                </div>
                </>
                    ) : (

                         <Perfil />   
                    )}
            </div>


            {errorMessage && (
        <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
          <Alert variant="filled" severity="error" sx={{ mb: 2 }} onClose={() => setOpenAlert(false)}>
            {errorMessage}
          </Alert>
        </Box>
      )}


        </>
    )
}
export default Login;