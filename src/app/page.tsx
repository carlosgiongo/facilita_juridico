'use client';

import Acordeao from '@/modules/Acordeao'
import { Box, Button, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'; // ícone de adição
import { useEffect, useState } from 'react'
import PlanoCartesiano from '@/modules/PlanoCartesiano';

export default function Home() {
  const [clientes, setClientes] = useState([])
  const [clientesFilter, setClientesFilter] = useState([])
  const [rotasClientes, setRotasClientes] = useState([{cord_x: 0, cord_y: 0, nome: 'Nenhum cliente calculado'}])

  const [novoClienteModal, setNovoClienteModal] = useState(false)
  const [pesquisar, setPesquisar] = useState('')

  const init = async () => {
    const response = await fetch(`http://localhost:3000/api/get_clients`)
    const data = await response.json()

    if (data.conteudo != null) {
      let clientes = data.conteudo.map((cliente: any) => {
        return {
          id: cliente.id,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
          endereco: {
            x: cliente.cord_x,
            y: cliente.cord_y,
          }
        }
      })

      setClientes(clientes)
      setClientesFilter(clientes)
    }
  }

  const pesquisarCliente = async (valor: string) => {
    console.log(`Filtrando =>`, valor)

    if (valor.length > 0) {
      setPesquisar(valor)

      let _clientes = clientes.filter((cliente: any) => {
        return cliente.nome.toLowerCase().includes(valor.toLowerCase()) || cliente.email.toLowerCase().includes(valor.toLowerCase()) || cliente.telefone.toLowerCase().includes(valor.toLowerCase()) || cliente.endereco.x.toLowerCase().includes(valor.toLowerCase()) || cliente.endereco.y.toLowerCase().includes(valor.toLowerCase())
      })

      setClientesFilter(_clientes)
    } else {
      setPesquisar(valor)
      setClientesFilter(clientes)
    }
  }

  const calcRotas = async () => {
    try{
      let request = await fetch(`http://localhost:3000/api/get_proximidade`)
      let data = await request.json()

      if(data.status == 200){
        setRotasClientes([{
          nome: 'Origem',
          cord_x: 0,
          cord_y: 0
        }, ...data.conteudo])
      } else {
        alert(`Erro ao calcular rotas`)
        alert(data.mensagem)
      }
    } catch (e) {
      alert(`Erro ao calcular rotas`)
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
        <Typography variant='h2' sx={{ marginBottom: `20px` }}>
          CLIENTES
        </Typography>

        <Box>
          <Box sx={{
            marginBottom: `2rem`,
          }}>
            <TextField id="outlined-basic" label="Pesquisar" variant="outlined" value={pesquisar} onChange={(e) => pesquisarCliente(e.target.value)} />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="success"
              sx={{ marginLeft: `1rem`, padding: `1rem` }}
              onClick={() => setNovoClienteModal(true)}
            >
              Novo Cliente
            </Button>
          </Box>
          <Acordeao
            clientes={clientesFilter}
            deletarCliente={deletarCliente}
            refreshAll={refreshDados}
            callNewClient={novoClienteModal}
            setNewClient={setNovoClienteModal}
          />
        </Box>

        <Box sx={{
          marginTop: `3rem`
        }}>
          <Box sx={{ display: `flex`, alignItems: `center` }}>
            <Typography variant='h2' sx={{ marginTop: `10px`, marginRight: `20px` }}>
              ROTAS
            </Typography>
            <Button variant="contained" color="primary" sx={{ padding: `1rem` }} onClick={calcRotas}>
              Calcular
            </Button>
          </Box>

          <Box sx={{
            height: `160px`,
            overflowY: `scroll`
          }}>
            {rotasClientes.length > 0 ? 
            rotasClientes.map((rota: any, index: number) => {
              return(<Typography variant='h4' key={index}><b>{index + 1}</b> {rota.nome} - X:{rota.cord_x}, Y:{rota.cord_y}</Typography>)
            })
            : <Typography variant='h4'>Nenhuma rota calculada</Typography>} 
          </Box>

          <PlanoCartesiano data={rotasClientes} />
        </Box>
      </Box>
    </Box>
  )
}
