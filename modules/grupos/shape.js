exports.shape = async function shape(client, message) {
    const { id, from, sender, isGroupMsg } = message;

    if (!isGroupMsg) {
        await client.react(id, "🤷🏻‍♀️");
        client.reply(from, "Este comando só pode ser usado em grupos.", id);
        return;
    }

    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;

    await client.react(id, "🤔");

    const shapeScore = parseInt(Math.random() * 100 + 1);
    const persona = pushname;

   await client.sendTextWithMentions(from, `Então @${persona} ,\n *O seu shape está ${shapeScore}%*`, id);

    if (shapeScore <= 20) {
        client.reply(from, "Frango detectado! Hora de começar a treinar sério! 🐔😂", id);
    } else if (shapeScore <= 40) {
        client.reply(from, "Tá quase saindo do time dos frangos, continua assim! 💪🐤", id);
    } else if (shapeScore <= 60) {
        client.reply(from, "Mandando bem, mas ainda tem espaço pra crescer! 🚀", id);
    } else if (shapeScore <= 80) {
        client.reply(from, "Que shape, hein? Já dá pra intimidar no rolê! 🔥", id);
    } else {
        client.reply(from, "Monstro! Tá com shape de fisiculturista! 🏆💪", id);
    }
}