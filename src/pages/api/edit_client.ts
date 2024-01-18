import type { NextApiRequest, NextApiResponse } from 'next';
import defaultResponse from './config/defautResponse';

const pool = require('./config/database');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        let cliente = req.body.cliente;

        if(!cliente) return res.status(400).json(defaultResponse(400, 'O cliente é obrigatório', null)); 

        if(!cliente.nome || !cliente.email || !cliente.telefone || !cliente.endereco) return res.status(400).json(defaultResponse(400, 'Todos os campos são obrigatórios', null));

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