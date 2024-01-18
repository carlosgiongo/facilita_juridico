import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

export default function ModalAlerta(props: ModalAlertaProps) {
    const handleClose = () => props.cancelar();
    
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {props.texto} <b>{props.cliente.nome}</b>?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleClose} sx={{ mr: 1 }}>Cancelar</Button>
                        <Button onClick={() => props.confirmar()}>Confirmar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
