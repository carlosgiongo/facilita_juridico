import type { NextApiRequest, NextApiResponse } from 'next';
import defaultResponse from './config/defautResponse';

const pool = require('./config/database');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        let cliente = req.body.cliente;

        if(!cliente) return res.status(400).json(defaultResponse(400, 'O cliente é obrigatório', null)); 
        if(!cliente.nome || !cliente.email || !cliente.telefone || !cliente.endereco.x || !cliente.endereco.y) return res.status(400).json(defaultResponse(400, 'Todos os campos são obrigatórios', null));
        if(isNaN(cliente.endereco.x) || isNaN(cliente.endereco.y)) return res.status(400).json(defaultResponse(400, 'As coordenadas devem ser números', null));

        //Validar telefone
        let telefone = cliente.telefone.replace(/\D/g, '');
        if(telefone.length < 10 || telefone.length > 11) return res.status(400).json(defaultResponse(400, 'O telefone deve ter 10 ou 11 dígitos', null));

        let edit_client = await pool.query(`
        UPDATE clientes SET 
        nome = $1, 
        email = $2, 
        telefone = $3,
        cord_x = $4,
        cord_y = $5 
        WHERE id = $6 RETURNING *`, 
        [cliente.nome, cliente.email, cliente.telefone, cliente.endereco.x, cliente.endereco.y, cliente.id]);

        res.status(200).json(defaultResponse(200, 'OK', edit_client.rows[0]));
    } catch {
        res.status(500).json(defaultResponse(500, 'Erro ao listar os clientes', null));
    }
}