const { responderTexto ,responderComMencoes} = require("../../sockets");

exports.couple = async function couple(client, enviado) {
    const { key, isGroup, metadata, sender } = enviado;
    const groupId = key.remoteJid;
    key.fromMe= false
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;

    if (!isGroup) {
        await responderTexto(client, groupId, "Este comando só pode ser usado em grupos.", enviado);
        return;
    }

    const botNumber = "553191958311@s.whatsapp.net";
    const compatibilidade = parseInt(Math.random() * 99 + 1);
    const mms = ["Casar", "Namorar", "Ficar"];
    
    let resultante;
    let topera;

    if (compatibilidade >= 51) {
        resultante = mms[0];
    } else if (compatibilidade >= 31) {
        resultante = mms[1];
    } else {
        resultante = mms[2]; 
    }

    const groupMembers = metadata.participants;
    const filteredMembers = groupMembers.filter(member => member.id !== botNumber && member.id !== sender);

    if (filteredMembers.length === 0) {
        await responderTexto(client, groupId, "Não foi possível encontrar um par para você.", enviado);
        return;
    }

    for (let i = filteredMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredMembers[i], filteredMembers[j]] = [filteredMembers[j], filteredMembers[i]];
        topera = filteredMembers.slice(0, 1);
    }

    let resultado = `Usuário: @${sender.replace(/@s.whatsapp.net/g, '')}\n `;
    for (let i = 0; i < topera.length; i++) {
        resultado += `Par: @${topera[i].id.replace(/@s.whatsapp.net/g, '')} \n`;
        resultado += `Compatibilidade: ${compatibilidade}%\n Vocês podiam ${resultante}`;
    }
    const lista= [topera[0].id,sender]
    await responderComMencoes(client, groupId, resultado,lista,enviado);
};
