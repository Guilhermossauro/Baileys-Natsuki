const googleTTS = require('google-tts-api');
const path = require('path');
const urlParse = require('url').parse;
const http = require('http');
const https = require('https');
const fs = require('fs-extra');
const { responderTexto } = require('../../sockets');

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const info = urlParse(url);
        const httpClient = info.protocol === 'https:' ? https : http;
        const options = {
            host: info.host,
            path: info.path,
            headers: {
                'user-agent': 'WHAT_EVER',
            },
        };

        httpClient
            .get(options, (res) => {
                if (res.statusCode !== 200) {
                    const msg = `request to ${url} failed, status code = ${res.statusCode} (${res.statusMessage})`;
                    reject(new Error(msg));
                    return;
                }
                const file = fs.createWriteStream(dest);
                file.on('finish', () => file.close(resolve));
                file.on('error', (err) => {
                    fs.unlink(dest);
                    reject(err);
                });
                res.pipe(file);
            })
            .on('error', reject)
            .end();
    });
}

exports.tts = async function tts(client, message) {
    const { id, from, mimetyped, chat, caption, isGroup } = message;
    const mensagem =  mimetyped.command
    const commands = mensagem
    if (!isGroup) {
        await responderTexto(client, from, "Este comando só pode ser usado em grupos.", message);
        return;
    }
    const args = commands.split(" ");
    if (args.length === 1) {
        return responderTexto(client, from, 'Foi mau, mas assim eu não consigo... preciso saber de uma frase também!', message);
    }

    let string = commands.split(' ').slice(1).join(' ');
    if (string.length >= 200) {
        return responderTexto(client, from, `MIZERICORDIA bisho q treco grande, quer me bugar??`, message);
    }
    const url = googleTTS.getAudioUrl(string, {
        lang: 'pt_BR',
        slow: false,
        host: 'https://translate.google.com',
    });
    const dest = await path.resolve(__dirname, '../../media/translate.mp3');
    await downloadFile(url, dest);
    await client.sendMessage(from, { audio: fs.readFileSync(dest),mimetype:'audio/mpeg', ptt: true }, { quoted: message });
     await fs.unlink(dest);
};
