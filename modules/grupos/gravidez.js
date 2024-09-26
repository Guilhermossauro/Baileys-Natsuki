const { responderComMencoes, responderTexto } = require("../../sockets");
exports.gravidez = async function gravidez(client, enviado) {
    const { key, isGroup, sender } = enviado;
    const from = key.remoteJid;
    const lista= [sender]
    if (!isGroup) {
         await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
         return;
     }

const aleatorio = Math.random()
let resultado
if (aleatorio <= 0.7) {
    resultado = 'positivo'
} else {
    resultado = 'negativo'
}
    const ar = `Então @${sender.replace(/@s.whatsapp.net/g, '')}, o seu teste de gravidez deu :\n *${resultado}*`
    await responderComMencoes(client, groupId, ar,lista,enviado);
    

}