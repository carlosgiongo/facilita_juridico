import type { NextApiRequest, NextApiResponse } from 'next';
import defaultResponse from './config/defautResponse';

const pool = require('./config/database');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        let cliente = req.body.cliente;
        if(!cliente) return res.status(400).json(defaultResponse(400, 'O cliente é obrigatório', null)); 
        if(!cliente.id) return res.status(400).json(defaultResponse(400, 'O ID do cliente é obrigatório', null));

        await pool.query(`
            DELETE FROM clientes WHERE id = $1`, 
        [cliente.id]);

        res.status(200).json(defaultResponse(200, 'OK', null));
    } catch(e) {
        console.log(e);
        res.status(500).json(defaultResponse(500, 'Erro ao listar os clientes', null));
    }
}