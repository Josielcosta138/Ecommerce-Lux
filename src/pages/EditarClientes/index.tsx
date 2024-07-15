import { FC, SetStateAction, useEffect, useState } from "react";
import "./index.css";
import { Button, TextField, Modal, Box, Typography, TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Avatar, InputAdornment, IconButton } from "@mui/material";
import Alert from '@mui/material/Alert';
import MenuCadastroCliente from "../../components/DadosCliente";
import { apiGet, apiPost, apiPut, STATUS_CODE } from "../../api/RestClient";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import EuUseImg from "../../pic/EuUse.png"
import { format, formatDate, parse, parseISO  } from "date-fns";



const EditarClientes: FC = () => {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [idCliente, setIdCliente] = useState<number | null>(null);
  const [rua, setRua] = useState<string>();
  const [bairro, setBairro] = useState<string>();
  const [cidade, setCidade] = useState<string>();
  const [estado, setEstado] = useState<string>();
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [section, setSection] = useState<string>('personalData');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  
  useEffect(() => {
    const id = localStorage.getItem('idCliente');

    if (id) {
      setIdCliente(Number(id));
      carregarDadosCliente(Number(id));
    }
  }, []);

  const carregarDadosCliente = async (id: number) => {
    try {
      const responseEnderecos = await apiGet(`enderecos/carregaEnderecosIdCliente/${id}`);
      const dadosCliente = responseEnderecos.data[0].clientes_id;

      const formattedDate = (dadosCliente.dataNascimento);
      const formatData=(inputDate: string)=> {
        const date = parseISO(formattedDate);
        return format(date, 'dd/MM/yyyy');
      }

      setNome(dadosCliente.nome || "");
      setSobrenome(dadosCliente.sobrenome || "");
      setDocumento(dadosCliente.documento || "");
      setEmail(dadosCliente.email || "");
      setDataNascimento(formatData || "");
      setEnderecos(responseEnderecos.data || []);
    } catch (error) {
      console.error("Erro ao carregar dados do cliente e endereços:", error);
    }
  };



  const salvarCliente = async () => {

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

    const response = await apiPut(`/clientes/atualizarCliente/${idCliente}`, data)

    if (response.status === STATUS_CODE.OK) {
      setIdCliente(response.data.id);
      localStorage.setItem("idCliente", response.data.id);
      setTimeout(() => {
        salvarEndereco()
      }, 1500);
    }
    
  }



  const salvarEndereco = async () => {
    const idClienteStorage = localStorage.getItem("idCliente") || "";

    for (const endereco of enderecos) {
      const data = {
        rua: endereco.rua,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        idCliente: idClienteStorage
      };

      const response = await apiPut(`/enderecos/atualizar/${idCliente}`, data);
      if (response.status === STATUS_CODE.OK) {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          window.location.href =(`/editarclientes/`);
          const id = localStorage.getItem('idCliente');
          carregarDadosCliente(Number(id));
        }, 5000);
      }
    }
  }
  
  const handleEditClick = () => {
    setIsDisabled(false); 
  };


  return (
    <div style={{ display: 'flex' }}>
      <MenuCadastroCliente setSection={setSection} />
      <Box className="full-screen" sx={{ flex: 1, p: 3 }}>
        {section === 'personalData' && (
          <div className="div-clientes">
            <div className="div-nome-linha">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
                <Typography variant="h6">
                  Dados do Cliente
                </Typography>
                <Avatar src={EuUseImg} sx={{ marginLeft: 24, width: 56, height: 56 }} />
              </Box>
              <div className="div-nome">
                <TextField
                  value={nome}
                  fullWidth
                  label="Nome"
                  onChange={(event) => setNome(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleEditClick}></IconButton>
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isDisabled}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={sobrenome}
                  fullWidth
                  label="Sobrenome"
                  onChange={(event) => setSobrenome(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleEditClick}></IconButton>
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isDisabled}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={documento}
                  fullWidth
                  label="CPF"
                  onChange={(event) => setDocumento(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleEditClick}></IconButton>
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isDisabled}
                />
              </div>
              <div className="div-nome">
            
              <TextField
                  value={dataNascimento}
                  fullWidth
                  label="Data de nascimento (DD/MM/YYYY)"
                  placeholder="DD/MM/YYYY"
                  onChange={(event) => setDataNascimento(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                         <IconButton onClick={handleEditClick}></IconButton>
                       <EditIcon  sx={{ color: 'blue' }}/>
                      </InputAdornment>
                    ),
                  }}
                  disabled={isDisabled}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={email}
                  fullWidth
                  label="Email"
                  onChange={(event) => setEmail(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleEditClick}></IconButton>
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isDisabled}
                />
              </div>
              <div className="div-nome">
                <TextField
                  value={senha}
                  fullWidth
                  label="Senha"
                  type="password"
                  onChange={(event) => setSenha(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleEditClick}></IconButton>
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isDisabled}
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

        {section === 'address' && (
          <Box className="modal-box-endereco">

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
              <Typography variant="h6">
                Endereços do Cliente
              </Typography>
              <Avatar src={EuUseImg} sx={{ marginLeft: 24, width: 56, height: 56 }} />
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rua</TableCell>
                    <TableCell>Bairro</TableCell>
                    <TableCell>Cidade</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enderecos.map((endereco, index) => (
                    <TableRow key={endereco.id}>
                      <TableCell>
                        <input
                          type="text"
                          value={endereco.rua}
                          onChange={(event) => {
                            const newRua = event.target.value;
                            setEnderecos((prevEnderecos) =>
                              prevEnderecos.map((e, i) =>
                                i === index ? { ...e, rua: newRua } : e
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={endereco.bairro}
                          onChange={(event) => {
                            const newBairro = event.target.value;
                            setEnderecos((prevEnderecos) =>
                              prevEnderecos.map((e, i) =>
                                i === index ? { ...e, bairro: newBairro } : e
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={endereco.cidade}
                          onChange={(event) => {
                            const newCidade = event.target.value;
                            setEnderecos((prevEnderecos) =>
                              prevEnderecos.map((e, i) =>
                                i === index ? { ...e, cidade: newCidade } : e
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="text"
                          value={endereco.estado}
                          onChange={(event) => {
                            const newEstado = event.target.value;
                            setEnderecos((prevEnderecos) =>
                              prevEnderecos.map((e, i) =>
                                i === index ? { ...e, estado: newEstado } : e
                              )
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {index % 2 === 0 ? <HomeIcon /> : <WorkIcon />}
                      </TableCell>
                      <TableCell>
                        <Button>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div className="div-nome">
              <Button
                variant="contained"
                onClick={salvarCliente}
              >
                Salvar
              </Button>
            </div>
          </Box>
        )}

          <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
                    <Alert severity="success" sx={{ mb: 2 }}>Seu cadastro foi atualizado com sucesso!</Alert>
                </Box>
            </Modal>

        
        {/*Cartão */}
        {section === 'paymentCards' && (
          <div>
            <Typography variant="h6">Cartões</Typography>
            <Typography variant="body1">Gerencie seus cartões aqui.</Typography>
          </div>
        )}

        {section === 'authentication' && (
          <div>
            <Typography variant="h6">Autenticação</Typography>
            <Typography variant="body1">Gerencie suas configurações de autenticação aqui.</Typography>
          </div>
        )}
      </Box>
    </div>
  );
};

export default EditarClientes;
