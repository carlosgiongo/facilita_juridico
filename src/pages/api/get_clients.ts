import type { NextApiRequest, NextApiResponse } from 'next';
import defaultResponse from './config/defautResponse';

const pool = require('./config/database');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        let clientes = await pool.query('SELECT * FROM clientes');

        res.status(200).json(defaultResponse(200, 'OK', clientes.rows));
    } catch {
        res.status(500).json(defaultResponse(500, 'Erro ao listar os clientes', null));
    }
}