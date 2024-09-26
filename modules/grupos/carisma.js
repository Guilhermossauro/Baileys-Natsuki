const { responderTexto, responderComMencoes } = require("../../sockets");

exports.carisma = async function carisma(client, enviado) {
    const { key, isGroup, sender } = enviado;
    const from = key.remoteJid;
    const lista = [sender];
    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
        return;
    }
    const carismaScore = parseInt(Math.random() * 100 + 1);
    const mensagem = `Então @${sender.replace(/@s.whatsapp.net/g, '')},\n *Seu carisma está em ${carismaScore}%*`;
    await responderComMencoes(client, from, mensagem, lista, enviado);

       let retorno;
    if (carismaScore <= 20) {
        retorno = "MISERICÓRDIA SENHOR, com esse carisma você pode tomar lugar do Grinch 😬😅";
    } else if (carismaScore <= 40) {
        retorno = "Você tem potencial, só precisa polir um pouco mais! 😏";
    } else if (carismaScore <= 60) {
        retorno = "Carismático, mas pode melhorar. Vai nessa! 😉";
    } else if (carismaScore <= 80) {
        retorno = "Que charme, hein? Já conquista só com um olhar! 😎✨";
    } else {
        retorno = "Carisma de superstar! Todo mundo adora você! 🌟😃";
    }
    await responderTexto(client, from, retorno, enviado);
};
