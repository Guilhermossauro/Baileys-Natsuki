const { responderTexto, responderComMencoes } = require("../../sockets");
exports.shape = async function shape(client, message) {
    const { key, from, sender, isGroup } = message;
    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", message);
        return;
    }

      const lista= [sender]
    const shapeScore = parseInt(Math.random() * 100 + 1);
    let resposta;
    if (shapeScore <= 20) {
        resposta = "Frango detectado! Hora de começar a treinar sério! 🐔😂";
    } else if (shapeScore <= 40) {
        resposta = "Tá quase saindo do time dos frangos, continua assim! 💪🐤";
    } else if (shapeScore <= 60) {
        resposta = "Mandando bem, mas ainda tem espaço pra crescer! 🚀";
    } else if (shapeScore <= 80) {
        resposta = "Que shape, hein? Já dá pra intimidar no rolê! 🔥";
    } else {
        resposta = "Monstro! Tá com shape de fisiculturista! 🏆💪";
    }
    await responderComMencoes(client, from, `Então @${sender.replace(/@s.whatsapp.net/g, '')},\n *O seu shape está ${shapeScore}%*`, lista, message);
    await responderTexto(client, from, resposta, message);
};
