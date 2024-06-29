import { FC, useState } from "react";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { Button, InputLabel, TextField } from "@mui/material";
import { format, parse } from "date-fns";

const Clientes: FC = () => {
    const [genero, setGenero] = useState<string>()
    const [nome, setNome] = useState<string>()
    const [sobrenome, setSobrenome] = useState<string>()
    const [documento, setDocumento] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [dataNascimento, setDataNascimento] = useState<string>()

    const salvarCliente = async() => {
        const formattedDate = dataNascimento ? format(parse(dataNascimento, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : '';

        const data = {
            nome: nome,
            sobrenome: sobrenome,
            documento: documento,
            email: email,
            senha: senha,
            // sexo: genero,
            dataNascimento: formattedDate,
        }

        const response = await apiPost("/clientes/criarCliente", data)
        if (response.status === STATUS_CODE.CREATED) {
            alert("O cadastrado realizado!")
        }
    }

    return <>
        <div className="div-container-cliente">
            <div className="div-cliente">
                <div className="div-campo-cliente">
                    <TextField
                        value={nome}
                        fullWidth
                        label="Nome" 
                        onChange={(event) => {
                            if(event){
                                setNome(event.target.value);
                            }
                        }}/>
                </div>
                <div className="div-campo-cliente">
                    <TextField
                        value={sobrenome}
                        fullWidth
                        label="Sobrenome" 
                        onChange={(event) => {
                            if(event){
                                setSobrenome(event.target.value);
                            }
                        }}/>
                </div>
                <div className="div-campo-cliente">
                    <TextField
                        value={documento}
                        fullWidth
                        label="CPF"
                        onChange={(event) => {
                           if(event){
                            setDocumento(event.target.value);
                           } 
                        }} />
                </div>
                <div className="div-campo-cliente">
                    <TextField
                       value={dataNascimento}
                       fullWidth
                       label="Data de nascimento (DD/MM/YYYY)"
                       placeholder="DD/MM/YYYY"
                        onChange={(event) => {
                            if(event){
                                setDataNascimento(event.target.value)
                            }
                        }}/>
                </div>
                <div className="div-campo-cliente">
                    <TextField
                        value={email}
                        fullWidth
                        label="Email" 
                        onChange={(event) => {
                            if(event){
                                setEmail(event.target.value);
                            }
                        }}/>
                </div>
                <div className="div-campo-cliente">
                    <TextField
                        value={senha}
                        fullWidth
                        label="Senha" 
                        onChange={(event) => {
                            if(event){
                                setSenha(event.target.value)
                            }
                        }} />
                </div>
                <div className="div-campo-cliente">
                    <Button 
                        variant="contained"
                        onClick={() => {
                            salvarCliente();
                        }}>
                            Salvar
                    </Button>
                </div>
            </div>

        </div>
    </>
}

export default Clientes;