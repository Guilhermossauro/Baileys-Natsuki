const axios = require('axios');
const { enviarTexto } = require("../../sockets");

exports.clima = async function clima(client, enviado) {
    const { key, mimetyped } = enviado;
    const body= mimetyped
    const commands = body.command.split(" ");
    
    if (commands.length === 1) {
        return enviarTexto(client, key.remoteJid, 'iiih parece que você esqueceu de colocar a cidade. Tenta de novo');
    }

    const cidade = commands.slice(1).join(" ");

    if (!cidade) {
        return enviarTexto(client, key.remoteJid, 'Preciso de um local...');
    }

    enviarTexto(client, key.remoteJid, `Verificando com São Pedro como está o clima em ${cidade}... pera um pouco`);

    try {
        let clima = await axios.get(`https://weather.contrateumdev.com.br/api/weather/city/?city=${encodeURI(cidade)}`);
        
        if (clima?.data?.cod === '404') {
            return enviarTexto(client, key.remoteJid, `Uai... ${clima?.data?.message}`);
        }

        let marquer = "```";
        let divisor = '- - - - - - - - - - - - - - - - - - - - - - - - - - - - -';
        let retorno = `
O clima agora em ${cidade}
${divisor}
${marquer}Tempo:${marquer}                               | ${clima.data.weather[0].description}
${marquer}Temperatura atual:${marquer} | ${clima?.data?.main?.temp.toFixed(2)}ºC
${marquer}Min:${marquer}                                    | ${clima?.data?.main?.temp_min.toFixed(2)} ºC
${marquer}Max:${marquer}                                    | ${clima?.data?.main?.temp_max.toFixed(2)} ºC
${marquer}Sensação térmica:${marquer}    | ${clima?.data?.main?.feels_like.toFixed(2)} ºC
${marquer}Umidade:${marquer}                           | ${clima?.data?.main?.humidity}%
${divisor}
Coordenadas: 
lat: ${clima?.data?.coord?.lat}
lon: ${clima?.data?.coord?.lon}`;

        enviarTexto(client, key.remoteJid, retorno);
    } catch (error) {
        console.log("Erro ao buscar o clima:", error);
        enviarTexto(client, key.remoteJid, 'Houve um erro ao tentar buscar as informações do clima.');
    }
};
