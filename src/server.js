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
let semafaroUmAtivo = 0; // Usando 0 para inativo
let semafaroDoisAtivo = 0; // Usando 0 para inativo

// Rota única para controlar semáforos e iluminação
app.route('/')
    .post((req, res) => {
        const { DSU, DSD, SL } = req.body;

        // Atualiza o valor do sensor de luminosidade
        sensorLumAtual = SL;

        // Lógica de controle dos semáforos
        semafaroUmAtivo = DSU < DSD ? 1 : 0; // Semáforo um ativo se a distância for menor
        semafaroDoisAtivo = semafaroUmAtivo ? 0 : 1; // Semáforo dois ativo se o um estiver inativo

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
