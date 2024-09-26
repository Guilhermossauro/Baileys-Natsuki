const { responderTexto, obterLinkGrupo,enviarTexto, enviarLinkComPrevia } = require("../../sockets");

exports.linkdogrupo = async function linkdogrupo(client, message) {
    const { key, from, isGroup, chat,metadata } = message;

    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", message);
        return;
    }
   const groupId = isGroup ? chat: '';
    const groupAdmins = metadata.participants.filter(participant => participant.admin);
    const isSenderAdmin = groupAdmins.some(admin => admin.id === message.key.participant);
    if (!isSenderAdmin) {
        return enviarTexto(client, sender, "Este comando só pode ser utilizado por administradores.");
    }
    const botNumber = "5527992666840@s.whatsapp.net";
    const isBotAdmin = groupAdmins.some(admin => admin.id === botNumber);
    if (!isBotAdmin) {
        return enviarTexto(client, from, "Não posso enviar o link do grupo, pois não sou administrador do grupo.");
    }

    const inviteLink = await obterLinkGrupo(client, groupId);
    const mensagem = `Link do grupo: \n*${inviteLink}*`;
    await enviarLinkComPrevia(client,from, mensagem,inviteLink);
};