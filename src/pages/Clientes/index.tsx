import { FC, useState } from "react";
import "./index.css";
import { STATUS_CODE, apiPost } from "../../api/RestClient";
import { Button, TextField, Modal, Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { format, parse } from "date-fns";
import Alert from '@mui/material/Alert';
import * as React from 'react';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import CreditCard from '@mui/icons-material/CreditCard';
import Lock from '@mui/icons-material/Lock';
import MenuCadastroCliente from "../../components/DadosCliente";

const data = [
    { icon: <Person />, label: 'Dados Pessoais' },
    { icon: <Home />, label: 'Endereço' },
    { icon: <CreditCard />, label: 'Cartões' },
    { icon: <Lock />, label: 'Autenticação' },
];


<MenuCadastroCliente setSection={function (value: React.SetStateAction<string>): void {
  throw new Error("Function not implemented.");
} } />


//component Clientes
const Clientes: FC = () => {
    const [nome, setNome] = useState<string>()
    const [sobrenome, setSobrenome] = useState<string>()
    const [documento, setDocumento] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [dataNascimento, setDataNascimento] = useState<string>()
    const [open, setOpen] = useState(false);
    const [rua, setRua] = useState<string>();
    const [bairro, setBairro] = useState<string>();
    const [cidade, setCidade] = useState<string>();
    const [estado, setEstado] = useState<string>();
    const [endereco, setEndereco] = useState<string>();
    const [idCliente, setIdCliente] = useState<number>();
    const [section, setSection] = useState<string>('personalData');


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
                setIdCliente(response.data.id);
                localStorage.setItem("idCliente", response.data.id);
            }
            setTimeout(() => {
                  salvarEndereco()
              }, 1500);
    }



    const salvarEndereco = async () => {

      const idClienteStorage = localStorage.getItem("idCliente") || "";

        const data = {
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            idCliente: idClienteStorage
        };

        const response = await apiPost("/enderecos/criar", data);
        if (response.status === STATUS_CODE.CREATED) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                localStorage.clear();
                window.location.href =(`/clientes/`);
            }, 5000);
        }
    }


    return (
       <div style={{ display: 'flex' }}>
      <MenuCadastroCliente setSection={setSection} />


        {/* Dados Pessoais */}
      <Box className="full-screen" sx={{ flex: 1, p: 3 }}>
        {section === 'personalData' && (
          <div className="div-clientes">
            <div className="div-nome-linha">
              <div className="div-nome">
                <TextField
                  value={nome}
                  fullWidth
                  label="Nome" 
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={sobrenome}
                  fullWidth
                  label="Sobrenome" 
                  onChange={(event) => setSobrenome(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={documento}
                  fullWidth
                  label="CPF"
                  onChange={(event) => setDocumento(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={dataNascimento}
                  fullWidth
                  label="Data de nascimento (DD/MM/YYYY)"
                  placeholder="DD/MM/YYYY"
                  onChange={(event) => setDataNascimento(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={email}
                  fullWidth
                  label="Email" 
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={senha}
                  fullWidth
                  label="Senha" 
                  onChange={(event) => setSenha(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <Button 
                  variant="contained"
                  onClick={() => setSection('address')}
                >
                  PRÓXIMO
                </Button>
              </div>
            </div>
          </div>
        )}



        {/* Endereço */}
        {section === 'address' && (
            <Box className="modal-box-endereco">
              <div className="div-nome">
                <TextField
                  value={rua}
                  fullWidth
                  label="Rua"
                  onChange={(event) => setRua(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={bairro}
                  fullWidth
                  label="Bairro"
                  onChange={(event) => setBairro(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={cidade}
                  fullWidth
                  label="Cidade"
                  onChange={(event) => setCidade(event.target.value)}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={estado}
                  fullWidth
                  label="Estado"
                  onChange={(event) => setEstado(event.target.value)}
                />
              </div>

              <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">Endereços</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                            value={endereco}
                            onChange={(event) => setEndereco(event.target.value)}
                        >
                        <FormControlLabel value="Casa" control={<Radio />} label="Casa" />
                        <FormControlLabel value="Trabalho" control={<Radio />} label="Trabalho" />
                        <FormControlLabel value="Opcional" control={<Radio />} label="Opcional" />
                  </RadioGroup>
            </FormControl>


              <div className="div-nome">
                <Button
                  variant="contained"
                  onClick={salvarCliente}
                >
                  Salvar Endereço
                </Button>
              </div>
            </Box>
        )}

        {/* Mensagem de sucesso */}
         <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
                    <Alert severity="success" sx={{ mb: 2 }}>Cliente e endereço cadastrados com sucesso!</Alert>
                </Box>
            </Modal>



        {/* Cartões */}
        {section === 'paymentCards' && (
          <div>
            {/* Implementar a lógica para Cartões aqui */}
            <Typography variant="h6">Cartões</Typography>
            <Typography variant="body1">Gerencie seus cartões aqui.</Typography>
          </div>
        )}

        {/* Autentitacação */}
        {section === 'authentication' && (
          <div>
            {/* Implementar a lógica para Autenticação aqui */}
            <Typography variant="h6">Autenticação</Typography>
            <Typography variant="body1">Gerencie suas configurações de autenticação aqui.</Typography>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Clientes;