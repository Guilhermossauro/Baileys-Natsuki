const { responderTexto, responderComMencoes } = require("../../sockets");

exports.bunda = async function bunda(client, enviado) {
    const { key, isGroup, sender } = enviado;
    const from = key.remoteJid;
    const lista = [sender];

    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
        return;
    }
    const confiometro = parseInt(Math.random() * 50 + 1);
    const mensagem = `Então @${sender.replace(/@s.whatsapp.net/g, '')},\n *O nível de gostosura de sua bunda é ${confiometro * 2}%*`;

    await responderComMencoes(client, from, mensagem, lista, enviado);

    let retorno;
    if (confiometro > 1 && confiometro <= 10) {
        retorno = "Ops! Parece que você é do time fitness: só pele e osso! Cuidado com o vento que está forte hoje 😂";
    } else if (confiometro > 10 && confiometro <= 20) {
        retorno = "Hmm... isso não é uma bunda, é uma tábua de passar!";
    } else if (confiometro > 20 && confiometro <= 30) {
        retorno = "Olha só, já dá pra fazer sucesso no verão! ☀️";
    } else if (confiometro > 30 && confiometro <= 40) {
        retorno = "Uau! Que arraso, hein? Quase uma Kardashian! 🍑";
    } else if (confiometro > 40 && confiometro <= 50) {
        retorno = "Mamma mia! Você é a própria Miss Bumbum! 🔥";
    }
    await responderTexto(client, from, retorno, enviado);
};
