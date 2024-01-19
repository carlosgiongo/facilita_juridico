import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

interface IProps {
    data: {
        cord_x: number;
        cord_y: number;
        nome: string;
    }[];
}

const PlanoCartesiano = (props: IProps) => {
    return (
        <ScatterChart width={500} height={500} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="cord_x" name="coordenada x" />
            <YAxis type="number" dataKey="cord_y" name="coordenada y" />
            <Scatter name="Pontos" data={props.data} fill="#8884d8" line lineType="joint" shape="circle" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        </ScatterChart>
    );
};

export default PlanoCartesiano;
