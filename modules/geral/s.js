const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { enviarTexto } = require('../../sockets')

exports.s = async function s(client, enviado) {
    const { key, message,isGroup2,sender } = enviado;
    if(!isGroup2){
        return enviarTexto(client,sender,"Este comando só pode ser utilizado em grupos")
    }

    let quotedMessage = message.extendedTextMessage?.contextInfo?.quotedMessage;
    let mediaMessage = quotedMessage || message;  
    if (mediaMessage.imageMessage || mediaMessage.videoMessage) {

        if (mediaMessage.imageMessage) {
            try {
                const buffer = await downloadMediaMessage({ message: mediaMessage }, 'buffer');       
                const sticker = new Sticker(buffer, {
                    pack: 'Natsuki-Bot',
                    author: `Faça em\n(27)992666840`,
                    type: StickerTypes.FULL,
                    quality: 100,
                });
                const stickerBuffer = await sticker.build();
                await client.sendMessage(sender, { sticker: stickerBuffer });
            } catch (error) {
                console.error('Erro ao criar figurinha de imagem:', error);
            }
        } else if (mediaMessage.videoMessage) {
            try {
                const buffer = await downloadMediaMessage({ message: mediaMessage }, 'buffer');
                const videoPath = './temp_video.mp4'; 
                const webpPath = './temp_sticker.webp'; 
                fs.writeFileSync(videoPath, buffer);
                await new Promise((resolve, reject) => {
                    ffmpeg(videoPath)
                        .outputOptions([
                            '-vcodec', 'libwebp',
                            '-vf', 'scale=512:512,fps=15',
                            '-loop', '0',
                            '-ss', '00:00:00.0',
                            '-t', '00:00:06.0',
                            '-preset', 'default',
                            '-an',
                            '-vsync', '0',
                            '-s', '512x512'
                        ])
                        .output(webpPath)
                        .on('end', resolve)
                        .on('error', reject)
                        .run();
                });
                const sticker = new Sticker(fs.readFileSync(webpPath), {
                    pack: 'Natsuki-Bot',
                    author: `Faça em\n(27)992666840`,
                    type: StickerTypes.FULL,
                    quality: 80,
                });
                const stickerBuffer = await sticker.build();
                await client.sendMessage(sender, { sticker: stickerBuffer });
                fs.unlinkSync(videoPath);
                fs.unlinkSync(webpPath);
            } catch (error) {
                console.error('Erro ao criar figurinha animada:', error);
            }
        } else {
            console.log('O tipo de mídia não é suportado.');
        }
    } else {
        return enviarTexto(client,sender,"Assim eu não consigo, preciso receber uma midia acompanhada de #s ou respondendo uma mensagem contendo uma midia")
    }
}
