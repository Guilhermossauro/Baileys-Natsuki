const commands = require("./comandos");

module.exports = msgHandler = async (client, enviado ) => {
    let grupoInfo;
    let ismedia= false
    const {key,message,isGroup}= enviado
    if(enviado.messageStubParameters== "No SenderKeyRecord found for decryption"){
        return (console.log('erro interno'))
    }
    let sender; 
    let metadata;
    if(isGroup){
        metadata= await client.groupMetadata(enviado.key.remoteJid)
        sender = enviado.key.participant
        
    }
    const mimetyped = await mimetest(message);
        if(mimetyped.mimetype !=`text`&& mimetyped.mimetype !=`ephemeralMessage` && mimetyped.mimetype !=`conversation`&& mimetyped.mimetype !=`Message`){
            ismedia= true
        }
const mensagem = message
const reset = "\x1b[0m";
const blue = "\x1b[34m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";

function colorText(text, color) {
    return `${color}${text}${reset}`;
}
const remoteJid= key.remoteJid
const fromMe= key.fromMe
const mentionedJidList = message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
const quotedMessageSender = message?.extendedTextMessage?.contextInfo?.participant;

     
           
           console.log(colorText("---------------------------------------", yellow));
            console.log(colorText('DATE TIME	===>', blue), colorText(new Date().toLocaleString('pt-br'), green));
            console.log(colorText("FROM_ID 	===>", blue), colorText(remoteJid, green));
            if(isGroup){
            console.log(colorText("SENDER	===>", blue), colorText(sender, green));}
             console.log(colorText("ARGUMENTS	===>", blue), colorText(ismedia ? `[${mimetyped.mimetype}]` : mimetyped.command, green));
     
    let isCommand = false
                enviado.sender= sender
                enviado.from=remoteJid
                enviado.mimetyped= mimetyped
                enviado.metadata= metadata
                enviado.chat=remoteJid
                enviado.quotedMessageSender= quotedMessageSender
                enviado.mentionedJidList= mentionedJidList
if(mimetyped.mimetype != `stickerMessage`) {  
    isCommand=  mimetyped.command && mimetyped.command.startsWith("#");
}

    if (isCommand ) {
        let commandText = mimetyped.command.toLowerCase().split(" ")[0] || "";
        commandText= commandText.slice(1)
        try {
            await commands[commandText](client,enviado);
        } catch (err) {
            console.log('UNKNOWN COMMAND:', commandText);
            console.log(err);
        }
    }
}

async function mimetest(message) {
      const types = [

        { key: 'extendedTextMessage', mime: 'text', command: msg => msg.extendedTextMessage.text },
        { key: 'reactionMessage', mime: 'reactionMessage', command: msg => msg.reactionMessage.key.text },
        { key: 'audioMessage', mime: 'audioMessage', command: null },
        { key: 'viewOnceMessageV2', mime: 'viewOnceMessageV2', command: null },
        { key: 'conversation', mime: 'conversation', command: msg => msg.conversation },
        { key: 'ephemeralMessage', mime: 'ephemeralMessage', command: msg => msg.ephemeralMessage.message.extendedTextMessage.text },
        { key: 'imageMessage', mime: 'imageMessage', command: msg => msg.imageMessage.caption },
        { key: 'stickerMessage', mime: 'stickerMessage', command: msg => msg.stickerMessage  },
        { key: 'videoMessage', mime: 'videoMessage', command: msg => msg.videoMessage.caption },
    ];
    for (const type of types) {
        if (message[type.key]) {
            return { mimetype: typeof type.mime === 'function' ? type.mime(message) : type.mime, command: type.command(message) };
        }
    }
    console.log(`mimetest fail: ${JSON.stringify(message)}`)
    return { mimetype: 'error', command: null };

    
}