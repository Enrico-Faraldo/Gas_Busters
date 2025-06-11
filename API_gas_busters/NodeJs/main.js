// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresSensorAnalogico,
    valoresSensor2,
    valoresSensor3,
    /*valoresSensor4,
    valoresSensor5,
    valoresSensor6,
    valoresSensor7,
    valoresSensor8,
    valoresSensor9,
    valoresSensor10,
    valoresSensor11,
    valoresSensor12,
    valoresSensor13,
    valoresSensor14,
    valoresSensor15,
    valoresSensor16,
    valoresSensor17,
    valoresSensor18,*/
    valoresSensor19
    
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'aluno',
            password: 'sptech',
            database: 'Gas_busters',
            port: 3306
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
       
        const sensorAnalogico = parseFloat(valores[0]);
        const sensor2 = sensorAnalogico * 1.5
        const sensor3 = sensorAnalogico * 2
        /*const sensor4 = sensorAnalogico * 1.5
        const sensor5 = sensorAnalogico * 2
        const sensor6 = sensorAnalogico * 1.5
        const sensor7 = sensorAnalogico * 2
        const sensor8 = sensorAnalogico * 1.5
        const sensor9 = sensorAnalogico * 2
        const sensor10 = sensorAnalogico * 1.5
        const sensor11 = sensorAnalogico * 2
        const sensor12 = sensorAnalogico * 1.5
        const sensor13 = sensorAnalogico * 2
        const sensor14 = sensorAnalogico * 1.5
        const sensor15 = sensorAnalogico * 2
        const sensor16 = sensorAnalogico * 1.5
        const sensor17 = sensorAnalogico * 2
        const sensor18 = sensorAnalogico * 1.5*/
        const sensor19 = sensorAnalogico * 2

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorAnalogico.push(sensorAnalogico);
        valoresSensor2.push(sensor2);
        valoresSensor3.push(sensor3);
        /*valoresSensor4.push(sensor4);
        valoresSensor5.push(sensor5);
        valoresSensor6.push(sensor6);
        valoresSensor7.push(sensor7);
        valoresSensor8.push(sensor8);
        valoresSensor9.push(sensor9);
        valoresSensor10.push(sensor10);
        valoresSensor11.push(sensor11);
        valoresSensor12.push(sensor12);
        valoresSensor13.push(sensor13);
        valoresSensor14.push(sensor14);
        valoresSensor15.push(sensor15);
        valoresSensor16.push(sensor16);
        valoresSensor17.push(sensor17);
        valoresSensor18.push(sensor18);*/
        valoresSensor19.push(sensor19);
       
        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "Leitura"
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 1)',
                [sensorAnalogico]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 2)',
                [sensor2]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 3)',
                [sensor3]
            );
            /*await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 4)',
                [sensor4]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 5)',
                [sensor5]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 6)',
                [sensor6]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 7)',
                [sensor7]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 8)',
                [sensor8]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 9)',
                [sensor9]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 10)',
                [sensor10]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 11)',
                [sensor11]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 12)',
                [sensor12]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 13)',
                [sensor13]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 14)',
                [sensor14]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 15)',
                [sensor15]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 16)',
                [sensor16]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 17)',
                [sensor17]
            );
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 18)',
                [sensor18]
            );*/
            await poolBancoDados.execute(
                'INSERT INTO Leitura (quantidade, dataLeitura, fkSensor) VALUES (?, current_timestamp(), 19)',
                [sensor19]
            );
            console.log("valores inseridos no banco: ", sensorAnalogico);
            console.log("valores inseridos no banco: ", sensor2);
            console.log("valores inseridos no banco: ", sensor3);
            /*console.log("valores inseridos no banco: ", sensor4);
            console.log("valores inseridos no banco: ", sensor5);
            console.log("valores inseridos no banco: ", sensor6);
            console.log("valores inseridos no banco: ", sensor7);
            console.log("valores inseridos no banco: ", sensor8);
            console.log("valores inseridos no banco: ", sensor9);
            console.log("valores inseridos no banco: ", sensor10);
            console.log("valores inseridos no banco: ", sensor11);
            console.log("valores inseridos no banco: ", sensor12);
            console.log("valores inseridos no banco: ", sensor13);
            console.log("valores inseridos no banco: ", sensor14);
            console.log("valores inseridos no banco: ", sensor15);
            console.log("valores inseridos no banco: ", sensor16);
            console.log("valores inseridos no banco: ", sensor17);
            console.log("valores inseridos no banco: ", sensor18);*/
            console.log("valores inseridos no banco: ", sensor19);

        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorAnalogico,
    valoresSensor2,
    valoresSensor3,
    /*valoresSensor4,
    valoresSensor5,
    valoresSensor6,
    valoresSensor7,
    valoresSensor8,
    valoresSensor9,
    valoresSensor10,
    valoresSensor11,
    valoresSensor12,
    valoresSensor13,
    valoresSensor14,
    valoresSensor15,
    valoresSensor16,
    valoresSensor17,
    valoresSensor18,*/
    valoresSensor19

) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valoresSensorAnalogico), response.json(valoresSensor2), response.json(valoresSensor3),
        /*response.json(valoresSensor4), response.json(valoresSensor5),
        response.json(valoresSensor6), response.json(valoresSensor7),
        response.json(valoresSensor8), response.json(valoresSensor9),
        response.json(valoresSensor10), response.json(valoresSensor11),
        response.json(valoresSensor12), response.json(valoresSensor13),
        response.json(valoresSensor14), response.json(valoresSensor15),
        response.json(valoresSensor16), response.json(valoresSensor17),
        response.json(valoresSensor18),*/ response.json(valoresSensor19);
    });
   
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorAnalogico = [];
    const valoresSensor2 = [];
    const valoresSensor3 = [];
    /*const valoresSensor4 = [];
    const valoresSensor5 = [];
    const valoresSensor6 = [];
    const valoresSensor7 = [];
    const valoresSensor8 = [];
    const valoresSensor9 = [];
    const valoresSensor10 = [];
    const valoresSensor11 = [];
    const valoresSensor12 = [];
    const valoresSensor13 = [];
    const valoresSensor14 = [];
    const valoresSensor15 = [];
    const valoresSensor16 = [];
    const valoresSensor17 = [];
    const valoresSensor18 = [];*/
    const valoresSensor19 = [];
    

    // inicia a comunicação serial
    await serial(
    valoresSensorAnalogico,
    valoresSensor2,
    valoresSensor3,
    /*valoresSensor4,
    valoresSensor5,
    valoresSensor6,
    valoresSensor7,
    valoresSensor8,
    valoresSensor9,
    valoresSensor10,
    valoresSensor11,
    valoresSensor12,
    valoresSensor13,
    valoresSensor14,
    valoresSensor15,
    valoresSensor16,
    valoresSensor17,
    valoresSensor18,*/
    valoresSensor19
    );

    // inicia o servidor web
    servidor(
    valoresSensorAnalogico,
    valoresSensor2,
    valoresSensor3,
    /*valoresSensor4,
    valoresSensor5,
    valoresSensor6,
    valoresSensor7,
    valoresSensor8,
    valoresSensor9,
    valoresSensor10,
    valoresSensor11,
    valoresSensor12,
    valoresSensor13,
    valoresSensor14,
    valoresSensor15,
    valoresSensor16,
    valoresSensor17,
    valoresSensor18,*/
    valoresSensor19
    );
})();