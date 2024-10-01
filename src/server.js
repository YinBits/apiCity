import express from 'express';
import bodyParser from 'body-parser';
import { lightsOfCity } from './iluminacao.js';
import { preferenceSemafaro } from './semafaro.js';

const server = express();
server.use(bodyParser.json()); 

// server.route('/')
//     .all((req, res, next) => {
//         next();
//     })
//     .get((req, res) => {
//         res.set('Content-Type', 'application/json');
//         res.json({ message: 'Bem-vindo ao servidor de sensores!' });
//     })
//     .post((req, res) => {
//         const { sensorLum, distanciasemafaroUm, distanciasemafaroDois } = req.body;

//         const resposta = {
//             sensorLum,
//             distanciasemafaroUm,
//             distanciasemafaroDois,
//             status: 'Dados recebidos!'
//         };

//         res.set('Content-Type', 'application/json');
//         res.json(resposta);
//     });

server.route('/semafaros')
    .all((req, res, next) => {
        next();
    })
    .post((req, res) => {
        const { distanciasemafaroUm, distanciasemafaroDois } = req.body;


        const { semafaroUm, semafaroDois } = preferenceSemafaro(distanciasemafaroUm, distanciasemafaroDois)

        const resposta = {
            semafaroUm,
            semafaroDois
        }
        res.set('Content-Type', 'application/json')
        res.json(resposta)
        
    })


//Iluminação da cidade
server.route('/iluminacao')
    .all((req, res, next) => {
        next();
    })
    .post((req, res) => {
        const { sensorLum } = req.body;

        const estadoLuzes = lightsOfCity(sensorLum);
        const resposta = {
            sensorLum,
            aceso: estadoLuzes,
            status: "Sensor recebido"
        };

        res.set('Content-Type', 'application/json');
        res.json(resposta);
    });

server.listen(4002, () => {
    console.log('Servidor rodando na porta 4002');
});
