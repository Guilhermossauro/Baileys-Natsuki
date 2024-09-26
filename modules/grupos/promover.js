const { enviarTexto, promoverParticipante } = require("../../sockets") 

exports.promover = async function promover(client, enviado) {
    const { key, message,isGroup2, metadata } = enviado;

    if (!isGroup2) {
        return enviarTexto(client, key.remoteJid, "Este comando só pode ser utilizado em grupos.");
    }
    const groupAdmins = metadata.participants.filter(participant => participant.admin);
    const isSenderAdmin = groupAdmins.some(admin => admin.id === enviado.key.participant);
    if (!isSenderAdmin) {
        return enviarTexto(client, key.remoteJid, "Este comando só pode ser utilizado por administradores.");
    }
    const botNumber = "5527992666840@s.whatsapp.net";
    const isBotAdmin = groupAdmins.some(admin => admin.id === botNumber);
    if (!isBotAdmin) {
        return enviarTexto(client, key.remoteJid, "Não posso promover usuários, pois não sou administrador do grupo.");
    }

    const mentionedJidList = message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const quotedMessageSender = message?.extendedTextMessage?.contextInfo?.participant;

    if (mentionedJidList.length === 0 && !quotedMessageSender) {
        return enviarTexto(client, key.remoteJid, "Por favor, mencione ou responda a um ou mais usuários para promove-los.");
    }

    if (quotedMessageSender && mentionedJidList.length === 0) {
        mentionedJidList.push(quotedMessageSender);
    }

    try {

        for (let user of mentionedJidList) {
            await promoverParticipante(client,key.remoteJid, [user])
            enviarTexto(client, key.remoteJid, `Usuário foi promovido com sucesso.`);
        }
    } catch (error) {
        console.log("Erro ao banir usuário(s):", error);
        enviarTexto(client, key.remoteJid, "Erro ao promover os usuários.");
    }
};
