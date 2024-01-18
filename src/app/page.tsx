'use client';

import Acordeao from '@/modules/Acordeao'
import { Box, Button, TextField, Typography } from '@mui/material'
import Image from 'next/image' 
import AddIcon from '@mui/icons-material/Add'; // ícone de adição
import { useEffect, useState } from 'react'

export default function Home() {
  const [clientes, setClientes] = useState([])

  const init = async () => {
    const response = await fetch(`http://localhost:3000/api/get_clients`)
    const data = await response.json()
    
    if(data.conteudo != null) {
      let clientes = data.conteudo.map((cliente: any) => {
        return {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco:{
            x: cliente.cord_x,
            y: cliente.cord_y,
          }
        }
      })

      setClientes(clientes)
    }
  }

  useEffect(() => {
    init()  
  }, [])

  const deletarCliente = (id: number) => {
    console.log(id)
  }

  const refreshDados = () => {
    init()
  }
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{
        display: `flex`,
        justifyContent: `space-around`,
        alignItems: `center`,
        backgroundColor: `#fff`,
        padding: `1rem`,
        color: `#000`,
        boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.25)`,
        marginBottom: `2rem`
      }}>
        <Box>
          <Image alt='Logo' src="/images/logo.webp" width={130} height={100} />
        </Box>

        <Box>
          <Typography variant="h4"><b>Teste prático</b></Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{
        margin: `0 8rem`,
      }}>
        <Typography variant='h2' sx={{marginBottom:`20px`}}>
          CLIENTES
        </Typography>

        <Box>
            <Box sx={{
              marginBottom: `2rem`,
            }}>
              <TextField id="outlined-basic" label="Pesquisar" variant="outlined" />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="success"
                sx={{marginLeft: `1rem`, padding: `1rem`}}
              >
                Novo Cliente
              </Button>
            </Box>
            <Acordeao clientes={clientes} deletarCliente={deletarCliente} refreshAll={refreshDados} />
        </Box>
      </Box>
    </Box>
  )
}
