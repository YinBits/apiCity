import express from 'express';
import bodyParser from 'body-parser';
import { Horario, lightsOfCity } from './iluminacao.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let sensorLumAtual = null; 
let semafaroUmAtivo = 0;
let semafaroDoisAtivo = 0; 


app.route('/')
    .post((req, res) => {
        const { DSU, DSD, SL } = req.body;

       
        sensorLumAtual = SL;

        // Lógica de controle dos semáforos
        semafaroUmAtivo = DSU < DSD ? 1 : 0; 
        semafaroDoisAtivo = semafaroUmAtivo ? 0 : 1;

        // Estado das luzes baseado no sensor de iluminação
        const estadoLuzes = lightsOfCity(SL);
        
        const resposta = {
            SU: semafaroUmAtivo,
            SD: semafaroDoisAtivo,
            SL,
            IL: estadoLuzes,
        };

        res.status(200).json(resposta);
    })
    .get((req, res) => {
        // Usa o valor atual do sensorLum
        const estadoLuzes = sensorLumAtual !== null ? lightsOfCity(sensorLumAtual) : 0;

        const resposta = {
            sensorLum: sensorLumAtual,
            IL: estadoLuzes,
            SU: semafaroUmAtivo,
            SD: semafaroDoisAtivo,
        };

        res.status(200).json(resposta);
    });

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
