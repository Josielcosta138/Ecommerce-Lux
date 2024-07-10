import { FC, useEffect, useState } from "react";
import "./index.css";
import { Button, TextField, Modal, Box, Typography, TableContainer, Paper, Table, TableRow, TableCell, TableHead, TableBody, Avatar, InputAdornment } from "@mui/material";
import Alert from '@mui/material/Alert';
import MenuCadastroCliente from "../../components/DadosCliente";
import { apiGet } from "../../api/RestClient";
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import EuUseImg from "../../pic/EuUse.png"


const EditarClientes: FC = () => {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [idCliente, setIdCliente] = useState<number | null>(null);
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [section, setSection] = useState<string>('personalData');

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
      setNome(dadosCliente.nome || "");
      setSobrenome(dadosCliente.sobrenome || "");
      setDocumento(dadosCliente.documento || "");
      setEmail(dadosCliente.email || "");
      setDataNascimento(dadosCliente.dataNascimento || "");
      setEnderecos(responseEnderecos.data || []);
    } catch (error) {
      console.error("Erro ao carregar dados do cliente e endereços:", error);
    }
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
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
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
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
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
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
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
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
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
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
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
                        <EditIcon sx={{ color: 'blue' }} />
                      </InputAdornment>
                    ),
                  }}
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
            {/* <Typography variant="h6">Endereços do Cliente</Typography> */}

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
                      <TableCell>{endereco.rua}</TableCell>
                      <TableCell>{endereco.bairro}</TableCell>
                      <TableCell>{endereco.cidade}</TableCell>
                      <TableCell>{endereco.estado}</TableCell>
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
              // onClick={salvarCliente}
              >
                Salvar Endereço
              </Button>
            </div>
          </Box>
        )}

        <Modal
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box className="alert-box" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
            <Alert severity="success" sx={{ mb: 2 }}>Cliente e endereço cadastrados com sucesso!</Alert>
          </Box>
        </Modal>

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
