const path = require("path");
const fs = require("fs");
const showAll = `*Ver tudo?*\nManda um _!menu_`;
const menugrupo = `*=== Comandos para grupos ===*
NOVIDADE : soco,chute,abraco,beijo
→ !welcome
→ !saida (altera a mensagem de adeus do bot)
→ !saudacao switch (passo a responder bom dia para o grupo)
→ !couple
→ !autorizarcomando
→ !jogodavelha 
→ !desautorizarcomando
→ !adminlista
→ !donodogrupo
→ !perfil 
→ !opiniao (eu digo minha opiniao sobre o que voce perguntar) 
→ !mencionartodos
→ !avisartodos mensagem
→ !ban @usuário
→ !add 2199988....
→ !sair (eu saio do grupo)
→ !autorizarbot (permite que o bot funciona)
→ !desautorizarbot (proíba que o bot funciona)
→ !promover
→ !rebaixar
→ !linkdogrupo
→ !kickme
→ !megasena 
→ !gravidez  
→ !fechar (fecho o grupo apenas para ADM) 
→ !abrir (abro o grupo para todos)
→ !contardias dd//mm/aaa
conto quantos dias faltam até a data informada 
substitua dd/mm/aaa pela data que você deseja saber
   ${showAll}`;

const rpg = `*=== Comandos para rpg ===*
→ !cadastroficha  
crio um molde de ficha para o grupo

→ !alterarficha
altero a ficha cadastrada do grupo

→ !ficha
retorno a ficha do grupo

→ !roll 
Faço a rolagem de dados  uso: !roll 2d100

${showAll} 
Veja as novidades com o comando !novidades 
`
const brincadeiras= `*=== Brincadeiras do BOT! ===*
    〘 Novidades: !soco, !chute, !abraco, !beijo 〙
→ !roll 1d20 (faz a rolagem de dados, podendo ser quantos dados quiser e qualquer valor também
→ !perfil 
→ !sorte 
→ !inteligencia 
→ !carisma 
→ !beleza 
→ !soco
→ !abraco
→ !chute
→ !beijo
→ !vip (retorno as informações do seu VIP)
→ !slotmachine (caça níquel)
→ !blackjack (jogo 21)
→ !jogodavelha (jogo da velha)
→ !pau
→ !bunda
→ !shape
→ !opiniao
→ !mamada
→ !tapa

→ !animebusca 
faz a busca de um anime a partir do link da imagem de um frame dele
Necessita ser um frame de um episódio para um resultado preciso


${showAll}`;
const outroscomandos= `*=== Outros comandos do BOT! ===*

→ !clima (cidade)
substitua (cidade) pela cidade que deseja saber o clima

→ !tts isso converte texto em audio

→ !meunumero
→ !readme
→ !roll 1d20 (faz a rolagem de dados, podendo ser quantos dados quiser e qualquer valor também

→ !perfil 

→ !slotmachine (caça níquel)

${showAll}`;

const menufig= `    *=== Figurinhas do BOT! ===*
    Mande uma foto, gif ou vídeo e digite _!s_ na legenda.
    Você também pode mencionar a foto, gif ou vídeo respondendo _!s_

    ${showAll}`;

    exports.menu = async function menu(client, enviado) {
        const {mimetyped,isGroup2,message}= enviado
        let body= mimetyped
        const sender = isGroup2 ? enviado.key.participant : enviado.key.remoteJid
        const mensagem =  body.command
         const {pushname, remoteJid} = enviado.key;
    const fig = path.resolve(__dirname, '../media/ss.jpg');
    const menudefeault = `
    ╭─⊣〘 Natsuki Bot 〙
╠Opaa eu sou a Natsuki,
║uma Ia em desenvolvimento para o whatsapp
╠➽𝐕𝐄𝐑𝐒Ã𝐎: 22.0
╠➽𝐍𝐎𝐌𝐄: ${pushname}
║
║••➽ Ola @${remoteJid.replace(/@s.whatsapp.net/g, '')}
║
╠Canal: youtube.com/@guilhermossauro1131
╠Dono: wa.me/5527988999019
╠Criador: wa.me/5527988999019
╠Licença: Apache 2.0
║
╠════════════════════
║ escolha uma das categorias:
╠════════════════════
╠ Figurinhas 📄
║ Manda !menu figurinhas
╠════════════════════
╠Downloads  ⬇️
║ Manda !menu download
╠════════════════════
╠Outros comandos 🌍
║ Manda !menu outros
╠════════════════════
╠ Grupos 📚
║ Manda !menu grupos 
╠════════════════════
╠ Jogos/brincadeiras 📚
║ Manda !menu jogos 
╠════════════════════
║ Para me adicionar em um grupo
║ mande !entrar (link do grupo)
╠════════════════════
║     rpg 🎲
║     Manda !menu rpg
    ╚════• 〘Natsuki Bot〙•═════╝
`
    
    const commands = mensagem
    const args = commands.split(" ");

    const helpMode = args[1];
    let help;

    switch (helpMode) {
        case 'figurinhas':
        case 'figurinha':

                  help = `${menufig}`;
                  response= {
                    image: fig,
                    caption:help,
                    mentions: array
                }
                await client.sendMessage(sender, response);
                return            
        case 'outros':
        case 'outro':
            help = `${outroscomandos}`
            break;
        case 'grupos':
        case 'grupo':
            help = `${menugrupo}`
            break;
        case 'rpg':
            help = `${rpg}`;
            break;
        default:
            help =`${menudefeault}`
            break;
            case 'download':
            case 'downloads':
                help = `*=== Comandos para download ===*
EM DESENVOLVIMENTO\n${showAll} \n Veja as novidades em desenvolvimento com o comando !novidades `
    }
    response= {text:help
    }
    await client.sendMessage(sender, response);
}

