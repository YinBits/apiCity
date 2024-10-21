import express from 'express';
import bodyParser from 'body-parser';
import { Horario, lightsOfCity } from './iluminacao.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Escuta em todas as interfaces

// Middleware
app.use(cors());
app.use(bodyParser.json());

let sensorLumAtual = null; 
let semafaroUmAtivo = 0;
let semafaroDoisAtivo = 0; 

let timestampAnterior = null;
let timestampAtual = null;
let timestampProximo = null;

app.route('/')
    .post((req, res) => {
        const {SL} = req.body;

        sensorLumAtual = SL;
        
        const estadoLuzes = lightsOfCity(SL);
       
        const agora = Date.now(); 

        if (timestampAtual === null) {
            timestampAtual = agora;
            timestampProximo = agora + 10000; // 10 segundos no futuro
        }
        if (agora >= timestampProximo) {
            semafaroUmAtivo = semafaroUmAtivo === 0 ? 1 : 0  
            semafaroDoisAtivo = semafaroUmAtivo === 1 ? 0 : 1;
            
            console.log(`Semáforo Um: ${semafaroUmAtivo}, Semáforo Dois: ${semafaroDoisAtivo}`);

            timestampAnterior = timestampAtual;
            timestampAtual = agora;
            timestampProximo = agora + 10000; // Atualiza para 10 segundos depois
        }

      
        
        // Formata a resposta como uma string
        const resposta = `${estadoLuzes}${semafaroUmAtivo}${semafaroDoisAtivo}`;

        res.status(200).send(resposta); // Envia a resposta como string
    })

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});
