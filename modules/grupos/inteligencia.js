const { responderTexto, responderComMencoes } = require("../../sockets");

exports.inteligencia = async function inteligencia(client, enviado) {
    const { key, isGroup, sender } = enviado;
    const from = key.remoteJid;
    const lista = [sender];

    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
        return;
    }

    let inteligenciaScore = parseInt(Math.random() * 100 + 1);

    const ar = `Então @${sender.replace(/@s.whatsapp.net/g, '')},\n *Seu nível de inteligência está em ${inteligenciaScore}%*`;
    await responderComMencoes(client, from, ar, lista, enviado);
    let retorno;
    if (inteligenciaScore <= 20) {
        retorno = "Precisando de umas aulinhas extras? 📚🤔";
    } else if (inteligenciaScore <= 40) {
        retorno = "Pelo menos não é um idiota funcional! 🧐";
    } else if (inteligenciaScore <= 60) {
        retorno = "eeeh ta na média né 🧠👍";
    } else if (inteligenciaScore <= 80) {
        retorno = "Cérebro de gênio! 🎓✨";
    } else {
        retorno = "Einstein? É você? 🤓🏆";
    }
    await responderTexto(client, from, retorno, enviado);
};
