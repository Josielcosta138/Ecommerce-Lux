import { FC} from "react";
import "./index.css";
import { Box } from "@mui/material";
import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Person from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import CreditCard from '@mui/icons-material/CreditCard';
import Lock from '@mui/icons-material/Lock';





const SidebarNav = styled(List)<{ component?: React.ElementType }>({
    '& .MuiListItemButton-root': {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  });




const MenuCadastroCliente : FC<{ setSection: React.Dispatch<React.SetStateAction<string>> }> = ({ setSection }) => {
    
    return (
      <Box sx={{ display: 'flex' }}>
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiListItemButton: {
                defaultProps: {
                  disableTouchRipple: true,
                },
              },
            },
            palette: {
              mode: 'dark',
              primary: { main: 'rgb(102, 157, 246)' },
              background: { paper: 'rgb(253 253 253)' },
            },
          })}
        >


          <Paper elevation={0} sx={{ maxWidth: 256 }}>
            <SidebarNav component="nav" disablePadding>
                
              {/* --- CADASTRO DE CLIENTE ---  */}
              <ListItemButton component="a" href="#client-registration-sidebar">
                <ListItemIcon sx={{ fontSize: 30 }}>📝</ListItemIcon>
                <ListItemText
                  sx={{ my: 0, whiteSpace: 'nowrap' }}
                  primary="Cadastro de Cliente"
                  primaryTypographyProps={{
                    fontSize: 20,
                    fontWeight: 'medium',
                    letterSpacing: 0,
                    color: 'black',
                  }}
                />
              </ListItemButton>
              <Divider />



              {/*---- DADOS PESSOAIS ---- */}
              <ListItem component="div" className="list-item">
                  <ListItemButton
                    onClick={() => setSection('personalData')}
                    className="list-item-button"
                  >
                    <ListItemIcon className="list-item-icon">
                      <Person color="primary" />
                    </ListItemIcon>
                          <ListItemText
                            primary="Dados Pessoais"
                            className="list-item-text"
                          />
                  </ListItemButton>
              </ListItem>
              <Divider />




              {/* ---- ENDERECO ---- */}
              <ListItem component="div" className="list-item">
                <ListItemButton
                  onClick={() => setSection('address')}
                  className="list-item-button"
                >
                  <ListItemIcon>
                    <Home color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Endereço"
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />




              {/* ---- CAARTÕES ---- */}
              <ListItem component="div" className="list-item">
                <ListItemButton
                  onClick={() => setSection('paymentCards')}
                  className="list-item-button"
                >
                  <ListItemIcon>
                    <CreditCard color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Cartões"
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />




              {/* ---- AUTENTICAÇÃO ---- */}
              <ListItem component="div" className="list-item">
                <ListItemButton
                  onClick={() => setSection('authentication')}
                  className="list-item-button"
                >
                  <ListItemIcon className="custom-lock-icon">
                      <Lock />
                  </ListItemIcon>
                  <ListItemText
                    primary="Autenticação"
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>



              
            </SidebarNav>
          </Paper>
        </ThemeProvider>
      </Box>
    );
  };

  export default MenuCadastroCliente;