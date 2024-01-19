import type { NextApiRequest, NextApiResponse } from 'next';
import defaultResponse from './config/defautResponse';

const pool = require('./config/database');

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cord_x: number;
    cord_y: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let request_banco = await pool.query(`SELECT * from clientes`);
        let clientes: Cliente[] = request_banco.rows

        let rota: Cliente[] = [];
        let pontoAtual = { x: 0, y: 0 };

        while (clientes.length > 0) {
            let maisProximo: Cliente = {id: -1, nome: '', email: '', telefone: '', cord_x: 0, cord_y: 0};
            let menorDistancia = Number.MAX_VALUE;

            clientes.forEach(cliente => {
                const distancia = Math.sqrt(
                    Math.pow(cliente.cord_x - pontoAtual.x, 2) + Math.pow(cliente.cord_y - pontoAtual.y, 2)
                );

                if (distancia < menorDistancia) {
                    maisProximo = cliente;
                    menorDistancia = distancia;
                }
            });

            if (maisProximo.id !== -1) {
                rota.push(maisProximo);
                pontoAtual = { x: maisProximo.cord_x, y: maisProximo.cord_y };
                clientes = clientes.filter(cliente => cliente !== maisProximo);
            }
        }

        
        res.status(200).json(defaultResponse(200, 'OK', rota));
    } catch (error) {
        res.status(500).json(defaultResponse(500, 'Erro ao calcular o aproveitamento em distância até os clientes', error));
    }
}
