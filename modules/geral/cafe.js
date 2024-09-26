exports.cafe = async function cafe(client, message) {
    const { id, from, body, sender, isGroupMsg,from_id,chat} = message;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
        await client.sendFileFromUrl(from,"https://coffee.alexflipnote.dev/random","fafaf",)
  
    }