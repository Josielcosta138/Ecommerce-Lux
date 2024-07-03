import { FC, useState } from "react";
import "./index.css";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { Button, InputLabel, TextField, Modal, Box, Typography } from "@mui/material";
import { format, parse } from "date-fns";

//component Clientes
const Clientes: FC = () => {
    const [genero, setGenero] = useState<string>()
    const [nome, setNome] = useState<string>()
    const [sobrenome, setSobrenome] = useState<string>()
    const [documento, setDocumento] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [dataNascimento, setDataNascimento] = useState<string>()
    const [open, setOpen] = useState(false);
    const [openEndereco, setOpenEndereco] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [rua, setRua] = useState<string>();
    const [bairro, setBairro] = useState<string>();
    const [cidade, setCidade] = useState<string>();
    const [estado, setEstado] = useState<string>();
    const [idCliente, setIdCliente] = useState<number>();


    const fechar = () => setOpen(false);
    const fecharEndereco = () => setOpenEndereco(false);

    const salvarCliente = async() => {

        const formattedDate = dataNascimento ? 
            format(parse(dataNascimento, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : '';

        const data = {
            nome: nome,
            sobrenome: sobrenome,
            documento: documento,
            email: email,
            senha: senha,
            dataNascimento: formattedDate,
        }

        const response = await apiPost("/clientes/criarCliente", data)

            if (response.status === STATUS_CODE.CREATED) {
                setOpen(true);
                setModalMessage("Cliente cadastrado com sucesso!")
                setIdCliente(response.data.id);

                setTimeout(() => {
                    setOpen(false);
                    setOpenEndereco(true); //abri model endereço apos cadastrar cliente
                }, 1000);
            }
    }


    const salvarEndereco = async () => {
        const data = {
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            idCliente: idCliente
        };

        const response = await apiPost("/enderecos/criar", data);
        if (response.status === STATUS_CODE.CREATED) {
            setOpenEndereco(false);
            setOpen(true);
            setModalMessage("Endereço cadastrado com sucesso!")

            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
    }



    return <>
        <div className="div-nome">
            <div className="div-clientes">
                <div className="div-nome-linha">
                    <div className="div-nome">
                    <TextField
                        value={nome}
                        fullWidth
                        label="Nome" 
                        onChange={(event) => {
                            if(event){
                                setNome(event.target.value);
                            }
                        }}
                    />
                </div>
                <div className="div-nome">
                    <TextField
                        value={sobrenome}
                        fullWidth
                        label="Sobrenome" 
                        onChange={(event) => {
                            if(event){
                                setSobrenome(event.target.value);
                            }
                        }}
                    />
                </div>
                <div className="div-nome">
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
                <div className="div-nome">
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
                <div className="div-nome">
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
                <div className="div-nome">
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
                <div className="div-nome">
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
        </div>

        <Modal
                open={open}
                onClose={fechar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Sucesso!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalMessage}
                    </Typography>
                </Box>
            </Modal>

            

        <Modal
            open={openEndereco}
            onClose={fecharEndereco}
            aria-labelledby="modal-endereco-title"
            aria-describedby="modal-endereco-description"
        >
            <Box className="modal-box-endereco">
                <Typography id="modal-endereco-title" variant="h6" component="h2">
                    Cadastro de Endereço
                </Typography>
                <div className="div-nome">
                    <TextField
                        value={rua}
                        fullWidth
                        label="Rua"
                        onChange={(event) => {
                            if (event) {
                                setRua(event.target.value);
                            }
                        }} />
                </div>
                <div className="div-nome">
                    <TextField
                        value={bairro}
                        fullWidth
                        label="Bairro"
                        onChange={(event) => {
                            if (event) {
                                setBairro(event.target.value);
                            }
                        }} />
                </div>
                <div className="div-nome">
                    <TextField
                        value={cidade}
                        fullWidth
                        label="Cidade"
                        onChange={(event) => {
                            if (event) {
                                setCidade(event.target.value);
                            }
                        }} />
                </div>
                <div className="div-nome">
                    <TextField
                        value={estado}
                        fullWidth
                        label="Estado"
                        onChange={(event) => {
                            if (event) {
                                setEstado(event.target.value);
                            }
                        }} />
                </div>
                <div className="div-nome">
                    <Button
                        variant="contained"
                        onClick={() => {
                            salvarEndereco();
                        }}>
                        Salvar Endereço
                    </Button>
                </div>
            </Box>
        </Modal>


    </>
}

export default Clientes;