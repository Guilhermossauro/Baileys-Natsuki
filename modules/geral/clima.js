const axios = require('axios');
const { enviarTexto } = require("../../sockets");
require("dotenv").config();
const USERKEY=process.env.USERKEY
const USERNAME=process.env.APIUSERNAME
const API_URL= process.env.API_URL
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
        const clima = await axios.post(API_URL, {
            texto: cidade,
            kea: USERKEY,
            phone:USERNAME 
                })
             
        if (clima?.data?.cod === '404') {
            return enviarTexto(client, key.remoteJid, `Uai... ${clima?.data?.message}`);
        }

        const{name,weather,main,coord}=clima.data
        const{temp,feels_like,temp_min,temp_max,humidity}= main
         const divisor = '- - - - - - - - - - - - - - - - - - - - - - - - - - - - -';
         const marquer = "```";
         const retorno=`O clima agora em ${name}
     ${divisor}
     ${marquer}Tempo:${marquer}                                | ${weather[0].main}
     ${marquer}Temperatura atual:${marquer}  | ${temp.toFixed(2)}ºC
     ${marquer}Min:${marquer}                                    | ${temp_min.toFixed(2)} ºC
     ${marquer}Max:${marquer}                                    | ${temp_max.toFixed(2)} ºC
     ${marquer}Sensação térmica:${marquer}    | ${feels_like.toFixed(2)} ºC
     ${marquer}Umidade:${marquer}                           | ${humidity}%
     ${divisor}
     Coordenadas: 
     lat: ${coord?.lat}
     lon: ${coord?.lon}
         `
        enviarTexto(client, key.remoteJid, retorno);
    } catch (error) {
        console.log("Erro ao buscar o clima:", error);
        enviarTexto(client, key.remoteJid, 'Houve um erro ao tentar buscar as informações do clima.');
    }
};
