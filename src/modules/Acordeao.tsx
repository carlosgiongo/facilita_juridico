'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box  from '@mui/material/Box';
import ModalAlerta from './ModalAlerta';
import ModalEdicao from './ModalEdicao';

interface AcordeaoProps {
  clientes: Array<{
    id: number,
    nome: string,
    email: string,
    telefone: string,
    endereco: {
      x: string,
      y: string
    }
  }>,
  callNewClient: boolean,
  setNewClient: (value: boolean) => void,
  refreshAll: () => void,
  deletarCliente: (id: number) => void
}

export default function Acordeao(props: AcordeaoProps = {
  clientes: [],
  callNewClient: false,
  setNewClient: () => {},
  refreshAll: () => {},
  deletarCliente: () => {}
}) {  

  const [modalAlerta, setModalAlerta] = React.useState(false);
  const [modalEdicao, setModalEdicao] = React.useState(false);
  const [modalNovoCliente, setModalNovoCliente] = React.useState(false);

  const [clienteEvidencia, setClienteEvidencia] = React.useState({
    id: 0,
    nome: ``,
    email: ``,
    telefone: ``,
    endereco: {
      x: `0`,
      y: `0`
    }
  });

  const showAlerta = (id: number) => {
    setClienteEvidencia(props.clientes.find(cliente => cliente.id === id) || {
      id: 0,
      nome: ``,
      email: ``,
      telefone: ``,
      endereco: {
        x: `0`,
        y: `0`
      }
    });

    setModalAlerta(true);
  }

  const remake = () => {
    setModalAlerta(false);
    setModalEdicao(false);
    setModalNovoCliente(false);

    props.setNewClient(false);
    props.refreshAll()
  }

  const deleteClient = async () => {
    const response = await fetch(`http://localhost:3000/api/delete_client`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({
        cliente: clienteEvidencia
      })
    });

    const data = await response.json();

    if (data.status == 200) {
      remake();
    }
  }

  const showEdicao = (id: number) => {
    setClienteEvidencia(props.clientes.find(cliente => cliente.id === id) || {
      id: 0,
      nome: ``,
      email: ``,
      telefone: ``,
      endereco: {
        x: `0`,
        y: `0`
      }
    });

    setModalEdicao(true);
  }

  const showNovoClienteModal = () => {
    console.log(`showNovoClienteModal`);

    setClienteEvidencia({
      id: -1,
      nome: ``,
      email: ``,
      telefone: ``,
      endereco: {
        x: `0`,
        y: `0`
      }
    });

    setModalNovoCliente(true);
  }

  const cancelNewClient = () => {
    setModalNovoCliente(false);
    props.setNewClient(false);
  }

  React.useEffect(() => {
    if(props.callNewClient){
      showNovoClienteModal();
    }
  }, [props.callNewClient]);

  return (
    <div>
      {props.clientes.length > 0 ? props.clientes.map((cliente, index) => {
        return(
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{cliente.nome.toUpperCase()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <b>Nome:</b> {cliente.nome}
            </Typography>
            <Typography>
              <b>Email:</b> {cliente.email}
            </Typography>
            <Typography>
              <b>Telefone:</b> {cliente.telefone}
            </Typography>
            <Box sx={{
              marginTop:`1rem`,
              display: `flex`,
              gap: `0.5rem`
            }}>
              <Button variant="contained" color="success" onClick={() => showEdicao(cliente.id)}>Editar</Button>
              <Button variant="contained" color="error" onClick={() => showAlerta(cliente.id)}>Excluir</Button>
            </Box>
          </AccordionDetails>
        </Accordion>)
      }) : <Typography>Nenhum cliente encontrado</Typography>}

      <ModalAlerta 
        cliente={clienteEvidencia}
        aberto={modalAlerta}
        texto="Deseja mesmo excluir o cliente"
        titulo="Excluir Cliente"
        confirmar={() => deleteClient()}
        cancelar={() => setModalAlerta(false)}
      />

      <ModalEdicao
        cliente={clienteEvidencia}
        aberto={modalEdicao}
        texto="Confirme as edições do cliente"
        titulo="Editar Cliente"
        confirmar={() => remake()}
        cancelar={() => setModalEdicao(false)}
      />

      <ModalEdicao
        cliente={clienteEvidencia}
        aberto={modalNovoCliente}
        texto="Confirme as informações do novo cliente"
        titulo="Novo Cliente"
        confirmar={() => remake()}
        cancelar={() => cancelNewClient()}
      />
    </div>
  );
}
