const { responderTexto, responderComMencoes } = require("../../sockets");

exports.beleza = async function beleza(client, enviado) {
    const { key, isGroup, sender } = enviado;
    const from = key.remoteJid;
    const lista = [sender];
    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
        return;
    }
    const belezaScore = parseInt(Math.random() * 100 + 1);
    const mensagem = `Então @${sender.replace(/@s.whatsapp.net/g, '')},\n *Sua beleza está em ${belezaScore}%*`;
    await responderComMencoes(client, from, mensagem, lista, enviado);
    let retorno;
    if (belezaScore <= 20) {
        retorno = "Ah, a beleza interior é o que conta, certo? 😂";
    } else if (belezaScore <= 40) {
        retorno = "Vamos dizer que você tem... uma personalidade encantadora? 😅";
    } else if (belezaScore <= 60) {
        retorno = "Não é de se jogar fora, mas talvez uma mudança de estilo ajude. 😏";
    } else if (belezaScore <= 80) {
        retorno = "O espelho deve adorar você, hein? 😎";
    } else {
        retorno = "Beleza pura! Deveria estar na capa de uma revista! 😍";
    }
    await responderTexto(client, from, retorno, enviado);
};
