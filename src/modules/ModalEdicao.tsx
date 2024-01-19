import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

interface ModalAlertaProps {
    cliente: {
        id: number,
        nome: string,
        email: string,
        telefone: string,
        endereco: {
            x: string,
            y: string
        }
    },
    aberto: boolean,
    texto: string,
    titulo: string,
    confirmar: () => void,
    cancelar: () => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalEdicao(props: ModalAlertaProps) {
    const [currentClient, setCurrentClient] = React.useState(props.cliente);
    const handleClose = () => props.cancelar();

    const handleConfirmarEdicao = async () => {
        if(currentClient.id == -1){
            const response = await fetch(`http://localhost:3000/api/post_client`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`
                },
                body: JSON.stringify({
                    cliente:currentClient
                })
            });

            const data = await response.json();

            if (data.status == 200) {
                props.confirmar();
            } else {
                alert(`Erro ao cadastrar cliente!`);
                alert(data.mensagem)
            }
        } else {
            const response = await fetch(`http://localhost:3000/api/edit_client`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`
                },
                body: JSON.stringify({
                    cliente:currentClient
                })
            });

            const data = await response.json();

            if (data.status == 200) {
                props.confirmar();
            } else {
                alert(`Erro ao editar cliente!`);
                alert(data.mensagem)
            }
        }
    }

    React.useEffect(() => {
        setCurrentClient(props.cliente);
    }, [props.cliente]);

    return (
        <div>
            <Modal
                open={props.aberto}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.titulo}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
                        {props.texto}
                    </Typography>

                    {/* Edicao dos campos */}
                    <Box>
                        <TextField onChange={(e) => setCurrentClient(currentClient => ({ ...currentClient, nome: e.target.value }))} sx={{ margin: `10px 0` }} id="nome" label="Nome" variant="outlined" value={currentClient.nome} />
                        <TextField onChange={(e) => setCurrentClient(currentClient => ({ ...currentClient, email: e.target.value }))} sx={{ margin: `10px 0` }} id="email" label="Email" variant="outlined" value={currentClient.email} />
                        <TextField onChange={(e) => setCurrentClient(currentClient => ({ ...currentClient, telefone: e.target.value }))} sx={{ margin: `10px 0` }} id="telefone" label="Telefone" variant="outlined" value={currentClient.telefone} />
                        <Box sx={{ display: `flex`, margin: `10px 0` }}>
                            <TextField onChange={(e) => setCurrentClient(currentClient => ({
                                ...currentClient,
                                endereco: {
                                    x: e.target.value,
                                    y: currentClient.endereco?.y
                                }
                            }))} id="x" label="Coordenada X" variant="outlined" value={currentClient.endereco.x} />
                            <TextField 
                            onChange={(e) => setCurrentClient(currentClient => ({
                                ...currentClient,
                                endereco: {
                                    x: currentClient.endereco?.x,
                                    y: e.target.value 
                                }
                            }))}
                            id="y" label="Coordenada Y" variant="outlined" value={currentClient.endereco.y} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>Cancelar</Button>
                        <Button onClick={handleConfirmarEdicao}>Confirmar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
