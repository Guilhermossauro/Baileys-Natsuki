const { enviarTexto } = require("../../sockets");

exports.confiabilidade = async function confiabilidade(client, enviado) {
    const { key, isGroup, mentionedJidList, sender } = enviado;

    if (!isGroup) {
        await enviarTexto(client, key.remoteJid, "Este comando só pode ser usado em grupos.");
        return;
    }


    if (!mentionedJidList || mentionedJidList.length === 0) {
        await enviarTexto(client, key.remoteJid, 'Poxa, eu ainda não sei quem você quer medir a confiabilidade\nEnvie o comando *!confiabilidade* @tagmember');
        return;
    }

    const mencionado = mentionedJidList.map(user => `@${user.replace(/@s.whatsapp.net/g, '')}`);
    const usuario = mencionado.join(', '); // Caso haja mais de um usuário mencionado
    const confiometro = parseInt(Math.random() * 100);
    const ar = `Então, na minha opinião:\n *Você pode confiar ${confiometro}% em ${usuario}`;
    await enviarTexto(client, key.remoteJid, ar);
    if (confiometro < 10) {
        await enviarTexto(client, key.remoteJid, "Cuidado com essa pessoa aí hein, quase não dá para confiar nela.");
    } else if (confiometro < 40) {
        await enviarTexto(client, key.remoteJid, "Cuidado com essa pessoa, às vezes ela pode ser meio imprevisível.");
    } else if (confiometro > 80) {
        await enviarTexto(client, key.remoteJid, "Eu acho que você pode confiar totalmente nesta pessoa :D");
    }
};
