const { enviarTexto, adicionarParticipante } = require("../../sockets") 

exports.add = async function add(client, enviado) {
    const { key, message,mimetyped, isGroup2, metadata } = enviado;
    let body= mimetyped
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
        return enviarTexto(client, key.remoteJid, "Não posso adicionar usuários, pois não sou administrador do grupo.");
    }

    const mentionedJidList = message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const quotedMessageSender = message?.extendedTextMessage?.contextInfo?.participant;
    
    if (quotedMessageSender && mentionedJidList.length === 0) {
        mentionedJidList.push(quotedMessageSender);
    }
    const commands = body.command.split(" ");
    if (commands.length > 1) {
        const phoneNumber = commands[1].replace(/\D/g, ''); 
        if (phoneNumber.length >= 11) {
            mentionedJidList.push(`${phoneNumber}@s.whatsapp.net`);
        }
    }

    if (mentionedJidList.length === 0) {
        return enviarTexto(client, key.remoteJid, "Por favor, mencione ou forneça o número de um usuário para adicioná-lo.");
    }

    try {
        for (let user of mentionedJidList) {
            await adicionarParticipante(client, key.remoteJid, [user]);
            enviarTexto(client, key.remoteJid, `Usuário ${user} foi adicionado com sucesso.`);
        }
    } catch (error) {
        console.log("Erro ao adicionar usuário(s):", error);
        enviarTexto(client, key.remoteJid, "Houve um erro ao tentar adicionar o(s) usuário(s).");
    }
};
