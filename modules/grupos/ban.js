const { enviarTexto, removerParticipante } = require("../../sockets")

exports.ban = async function ban(client, enviado) {
    const {message,isGroup2, metadata,sender } = enviado;

    if (!isGroup2) {
        return enviarTexto(client, sender, "Este comando só pode ser utilizado em grupos.");
    }
    const groupAdmins = metadata.participants.filter(participant => participant.admin);
    const isSenderAdmin = groupAdmins.some(admin => admin.id === enviado.key.participant);
    if (!isSenderAdmin) {
        return enviarTexto(client, sender, "Este comando só pode ser utilizado por administradores.");
    }
    const botNumber = "5527992666840@s.whatsapp.net";
    const isBotAdmin = groupAdmins.some(admin => admin.id === botNumber);
    if (!isBotAdmin) {
        return enviarTexto(client, sender, "Não posso banir usuários, pois não sou administrador do grupo.");
    }

    const mentionedJidList = message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const quotedMessageSender = message?.extendedTextMessage?.contextInfo?.participant;

    if (mentionedJidList.length === 0 && !quotedMessageSender) {
        return enviarTexto(client, sender, "Por favor, mencione ou responda a um ou mais usuários para bani-los.");
    }

    if (quotedMessageSender && mentionedJidList.length === 0) {
        mentionedJidList.push(quotedMessageSender);
    }

    try {

        for (let user of mentionedJidList) {
            await removerParticipante(client,sender, [user])
            enviarTexto(client, sender, `Usuário foi banido com sucesso.`);
        }
    } catch (error) {
        console.log("Erro ao banir usuário(s):", error);
        enviarTexto(client, sender, "Erro ao banir os usuários.");
    }
};
