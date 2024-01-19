import type { NextApiRequest, NextApiResponse } from 'next';
import defaultResponse from './config/defautResponse';

const pool = require('./config/database');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        let cliente = req.body.cliente;

        console.log(cliente);

        if(!cliente) return res.status(400).json(defaultResponse(400, 'O cliente é obrigatório', null)); 
        if(!cliente.nome || !cliente.email || !cliente.telefone || !cliente.endereco.x || !cliente.endereco.y) return res.status(400).json(defaultResponse(400, 'Todos os campos são obrigatórios', null));
        if(isNaN(cliente.endereco.x) || isNaN(cliente.endereco.y)) return res.status(400).json(defaultResponse(400, 'As coordenadas devem ser números', null));

        //Validar telefone
        let telefone = cliente.telefone.replace(/\D/g, '');
        if(telefone.length < 10 || telefone.length > 11) return res.status(400).json(defaultResponse(400, 'O telefone deve ter 10 ou 11 dígitos', null));

        let insert_client = await pool.query(`
            INSERT INTO clientes (nome, email, telefone, cord_x, cord_y)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [cliente.nome, cliente.email, cliente.telefone, cliente.endereco.x, cliente.endereco.y])

        res.status(200).json(defaultResponse(200, 'OK', insert_client.rows[0]));
    } catch {
        res.status(500).json(defaultResponse(500, 'Erro ao listar os clientes', null));
    }
}