const deletarMensagem = async (c, mensagem, mensagemCitada = false) => {
    let mensagemDeletada;
    if (mensagemCitada) {
        mensagemDeletada = {
            remoteJid: mensagem.key.remoteJid,
            fromMe: false,
            id: mensagem.message.extendedTextMessage.contextInfo.stanzaId,
            participant: mensagem.message.extendedTextMessage.contextInfo.participant
        };
    } else {
        mensagemDeletada = mensagem.key;
    }
    return await c.sendMessage(mensagem.key.remoteJid, { delete: mensagemDeletada });
};

const lerMensagem = async (c, id_chat, remetente, id_mensagem) => {
    return await c.sendReceipt(id_chat, remetente, [id_mensagem], 'read');
};

const atualizarPresenca = async (c, id_chat, tipo) => {
    await c.presenceSubscribe(id_chat);
    await c.sendPresenceUpdate(tipo, id_chat);
    await c.sendPresenceUpdate('paused', id_chat);
};

const alterarFotoPerfil = async (c, id_chat, bufferImagem) => {
    return await c.updateProfilePicture(id_chat, bufferImagem);
};

const alterarStatusPerfil = async (c, status) => {
    return await c.updateProfileStatus(status);
};

const encerrarBot = async (c) => {
    return await c.end(new Error("Comando"));
};

const obterFotoPerfil = async (c, id_chat) => {
    return await c.profilePictureUrl(id_chat, "image");
};

const bloquearContato = async (c, id_usuario) => {
    return await c.updateBlockStatus(id_usuario, "block");
};

const desbloquearContato = async (c, id_usuario) => {
    return await c.updateBlockStatus(id_usuario, "unblock");
};

const obterNumeroHost = async (c) => { 
    let id = c.user.id.replace(/:[0-9]+/ism, '');
    return id;
};

const obterContatosBloqueados = async (c) => { 
    return await c.fetchBlocklist();
};

const enviarTexto = async (c, id_chat, texto) => {
    await atualizarPresenca(c, id_chat, "composing");
    return await c.sendMessage(id_chat, { text: texto, linkPreview: null });
};
const reagir= async(c,id_chat,message,texto)=>{
      return await c.sendMessage(id_chat,{ react: texto,key:message});
}

const retransmitirMensagem = async (c, id_chat, mensagem, mensagemCitacao) => {
    mensagem[Object.keys(mensagem)[0]].contextInfo = {
        stanzaId: mensagemCitacao.key.id,
        remoteJid: mensagemCitacao.key.remoteJid,
        participant: mensagemCitacao.key.participant || mensagemCitacao.key.remoteJid,
        fromMe: mensagemCitacao.key.fromMe,
        quotedMessage: {}
    };
    return await c.relayMessage(id_chat, mensagem, {});
};

const enviarEnquete = async (c, id_chat, nomeEnquete, valoresEnquete) => {
    return await c.sendMessage(id_chat, { poll: { name: nomeEnquete, values: valoresEnquete, selectableCount: 1 } });
};

const enviarLinkComPrevia = async (c, id_chat, texto) => {
    await atualizarPresenca(c, id_chat, "composing");
    return await c.sendMessage(id_chat, { text: texto, linkPreview: true  });
};

const enviarTextoComMencoes = async (c, id_chat, texto, mencionados) => { 
    await atualizarPresenca(c, id_chat, "composing");
    return await c.sendMessage(id_chat, { text: texto, mentions: mencionados });
};

const enviarFigurinha = async (c, id_chat, sticker) => { 
    return await c.sendMessage(id_chat, { sticker });
};

const responderTexto = async (c, id_chat, texto, mensagemCitacao) => { 
    await atualizarPresenca(c, id_chat, "composing");
    return await c.sendMessage(id_chat, { text: texto, linkPreview: null }, { quoted: mensagemCitacao });
};

const responderComMencoes = async (c, id_chat, texto, mencionados, mensagemCitacao) => { 
    await atualizarPresenca(c, id_chat, "composing");
    return await c.sendMessage(id_chat, { text: texto, mentions: mencionados }, { quoted: mensagemCitacao });
};

const entrarLinkGrupo = async (c, idLink) => {
    return await c.groupAcceptInvite(idLink);
};

const revogarLinkGrupo = async (c, id_grupo) => {
    return await c.groupRevokeInvite(id_grupo);
};

const obterLinkGrupo = async (c, id_grupo) => {
    let codigoConvite = await c.groupInviteCode(id_grupo);
    return codigoConvite ? `https://chat.whatsapp.com/${codigoConvite}` : undefined;
};

const sairGrupo = async (c, id_grupo) => {
    return await c.groupLeave(id_grupo);
};

const obterInfoConviteGrupo = async (c, link) => {
    return await c.groupGetInviteInfo(link);
};

const alterarRestricaoGrupo = async (c, id_grupo, status) => {
    let config = status ? "announcement" : "not_announcement";
    return await c.groupSettingUpdate(id_grupo, config);
};

const obterMembrosGrupoPorMetadata = async (grupoMetadata) => { 
    let { participants } = grupoMetadata;
    let participantes = [];
    participants.forEach((participant) => {
        participantes.push(participant.id);
    });
    return participantes;
};

const obterAdminsGrupoPorMetadata = async (grupoMetadata) => { 
    let { participants } = grupoMetadata;
    let grupoAdmins = participants.filter(member => (member.admin != null));
    let admins = [];
    grupoAdmins.forEach((admin) => {
        admins.push(admin.id);
    });
    return admins;
};

const obterTodosGrupos = async (c) => { 
    let grupos = await c.groupFetchAllParticipating();
    let gruposInfo = [];
    for (let [key, value] of Object.entries(grupos)) {
        gruposInfo.push(value);
    }
    return gruposInfo;
};

const removerParticipante = async (c, id_grupo, participante) => {
    let resposta = await c.groupParticipantsUpdate(id_grupo, [participante], "remove");
    return resposta[0];
};

const adicionarParticipante = async (c, id_grupo, participante) => {
    let resposta = await c.groupParticipantsUpdate(id_grupo, [participante], "add");
    return resposta[0];
};

const promoverParticipante = async (c, id_grupo, participante) => {
    let resposta = await c.groupParticipantsUpdate(id_grupo, [participante], "promote");
    return resposta[0];
};

const rebaixarParticipante = async (c, id_grupo, participante) => {
    let resposta = await c.groupParticipantsUpdate(id_grupo, [participante], "demote");
    return resposta[0];
};


module.exports = {deletarMensagem,lerMensagem,atualizarPresenca,alterarFotoPerfil,alterarStatusPerfil,
encerrarBot,obterFotoPerfil,bloquearContato,desbloquearContato,obterNumeroHost,obterContatosBloqueados,
enviarTexto,retransmitirMensagem,enviarEnquete,enviarLinkComPrevia,enviarTextoComMencoes,enviarFigurinha,responderTexto,
responderComMencoes,entrarLinkGrupo,revogarLinkGrupo,obterLinkGrupo,sairGrupo,obterInfoConviteGrupo,alterarRestricaoGrupo,
obterMembrosGrupoPorMetadata,obterAdminsGrupoPorMetadata,obterTodosGrupos,removerParticipante,adicionarParticipante,
promoverParticipante,rebaixarParticipante,reagir};
