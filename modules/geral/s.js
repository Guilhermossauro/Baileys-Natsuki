const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const axios = require('axios');
const { enviarTexto } = require('../../sockets');
const hamma_sticker = require('wa-sticker-hamma')
exports.s = async function s(client, enviado) {
    const { from, isGroup, quotedMessage, message } = enviado;
    if (!isGroup) {
        return enviarTexto(client, from, "Este comando só pode ser utilizado em grupos");
    }

    let mediaMessage = message;
    if (quotedMessage !== undefined) {
        mediaMessage = quotedMessage;
    }

    if (mediaMessage.imageMessage || mediaMessage.videoMessage) {
        if (mediaMessage.imageMessage) {
                try {
                const buffer = await downloadMediaMessage({ message: mediaMessage }, 'buffer');
                const imagePath = './temp_image.jpg';
                const webpPath = './temp_sticker.webp';
                fs.writeFileSync(imagePath, buffer);
                await new Promise((resolve, reject) => {
                    ffmpeg(imagePath)
                        .outputOptions([
                            '-vcodec', 'libwebp',
                            '-vf', 'scale=512:512',
                            '-loop', '0',
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
try {
    const sticker = new hamma_sticker.Sticker(webpPath, {pack: 'Natsuki-bot', author: `Faça em\n    (27)992666840` })
    await sticker.build()
    const sticBuffer = await sticker.get()
    await client.sendMessage(from, { sticker: sticBuffer });
}catch(err){
    console.log(`erro nesse novo modulo ae`)
}
                 fs.unlinkSync(webpPath)
                fs.unlinkSync(imagePath);
            } catch (error) {
                console.error('Erro ao criar figurinha de imagem:', error);
            }
        } else if (mediaMessage.videoMessage) {
            try {
                const buffer = await downloadMediaMessage({ message: mediaMessage }, 'buffer');
                const videoPath = './temp_video.mp4';
                const webpPath = './temp_sticker.webp';
                fs.writeFileSync(videoPath, buffer);

                // Converte vídeo em WebP para figurinha animada
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

                const stickerBuffer = fs.readFileSync(webpPath);
                await client.sendMessage(from, { sticker: stickerBuffer });
                fs.unlinkSync(videoPath);
                fs.unlinkSync(webpPath);
            } catch (error) {
                console.error('Erro ao criar figurinha animada:', error);
            }
        } else {
            console.log('O tipo de mídia não é suportado.');
        }
    } else {
        return enviarTexto(client, from, "Assim eu não consigo, preciso receber uma mídia acompanhada de #s ou respondendo uma mensagem contendo uma mídia");
    }
};
