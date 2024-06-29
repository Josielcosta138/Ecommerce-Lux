import { FC, useState } from "react";
import "./index.css";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { AlternateEmail, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { IClienteStore } from "../../store/ClienteStore/type";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { addClienteStore } from "../../store/ClienteStore/clienteStore";

interface LoginProperties{
    onClose: () => void,
    onLogin: (cliente : IClienteStore) => void;
}

const Login : FC<LoginProperties> = ({
    onClose,
    onLogin,
    
}) => {
    const [tipoSenha, setTipoSenha] = useState<boolean>(false)
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();

    const onTipoSenha = () => {
        setTipoSenha(!tipoSenha)
    }


    const autenticarCliente = async () => {
        const data = {
            email: email,
            senha: senha
        }



        const response = 
            await apiPost("/clientes/autenticar/", data);
        if (response.status === STATUS_CODE.OK) {
            const dataResult = response.data;

            const cliente : IClienteStore = {
                id: dataResult.id,
                nome: dataResult.nome,
                email: dataResult.email,
            }

            addClienteStore(cliente);
            onLogin(cliente);

            return;
        }
        alert("Usuário ou senha invalido!")
    }




    return <>
        
        <div className="div-login">
            <div className="div-login-linha">
                <TextField 
                    fullWidth
                    label="Email"
                    type="email"
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
                <Button style={{width:"50%"}} variant="contained"
                onClick={() =>{
                    autenticarCliente();
                }}
                >Entrar</Button>
            </div>
            <div className="div-login-linha">
                <p>Não possui conta? <a href="/clientes/">Cadastre-se</a></p>
            </div>
        </div>

    </>
}
export default Login;