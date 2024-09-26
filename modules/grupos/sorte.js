const { responderTexto, responderComMencoes } = require("../../sockets");

exports.sorte = async function sorte(client, enviado) {
    const { key, isGroup, sender } = enviado;
    const from = key.remoteJid;
    const lista = [sender];
    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
        return;
    }
    const sorteScore = parseInt(Math.random() * 100 + 1);
    const mensagem = `Então @${sender.replace(/@s.whatsapp.net/g, '')},\n *Sua sorte está em ${sorteScore}%*`;
    await responderComMencoes(client, from, mensagem, lista, enviado);
    let retorno;
    if (sorteScore <= 20) {
        retorno = "Tá precisando de um trevo de quatro folhas, hein? 🍀😅";
    } else if (sorteScore <= 40) {
        retorno = "Um pouquinho de sorte, mas ainda não dá pra jogar na loteria. 🍀🤞";
    } else if (sorteScore <= 60) {
        retorno = "Tá na média, a sorte está ao seu lado! 🍀👌";
    } else if (sorteScore <= 80) {
        retorno = "Sortudo! Você devia tentar a sorte em alguma coisa! 🍀🎲";
    } else {
        retorno = "Tá com sorte de campeão! Vai em frente que é vitória certa! 🍀🏆";
    }
    await responderTexto(client, from, retorno, enviado);
};
