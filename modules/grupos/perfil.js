const fs = require('fs');
const axios = require('axios');
const { insertPhotoIntoTemplate} = require("../../fetch");
const { enviarTexto} = require("../../sockets");
const  Canvas  = require('canvas');

exports.perfil = async function perfil(client, enviado) {
    const { key, message } = enviado;
    const sender = enviado.key.participant || enviado.key.remoteJid;
    let pushname = enviado.pushName || sender;

    // Gerar valores aleatórios para o perfil
    const valores = {
        GOSTOSURA: Math.floor(Math.random() * 100),
        corno: Math.floor(Math.random() * 100),
        programa: Math.floor(Math.random() * 110000),
        puta: Math.floor(Math.random() * 100),
        cachaceiro: Math.floor(Math.random() * 100),
        fome: Math.floor(Math.random() * 100),
        inteligencia: Math.floor(Math.random() * 100),
    };
    
    const mms =['Motivação é a arte de fazer as pessoas fazerem o que você quer que elas façam porque elas o querem fazer.','Se voce quiser ajudar o gui a me manter todos os dias online \n pix: guilhermes.aufera@gmail.com \n O pix é opcional e pode ser qualquer valor que você quiser.',  'Toda ação humana, quer se torne positiva ou negativa, precisa depender de motivação.', 'pra mim,você é a mais incrível das pessoas', 
        'Eu queria que você pudesse olhar com os meus olhos e visse o quanto você é uma pessoa incrível','.\n Queria que olhasse para dentro de ti e percebesse o quanto eu sou franco ao dizer que és delicadamente belo enquanto dorme ou quando boceja. Queria que olhasse para si quando está quieto lendo ou até mesmo chorando. Todo mundo é incrível quando faz essas coisas, quando está na companhia de si próprio.', ' Quando está em paz e quando é você de verdade.',
        'oii eu sou a natsuki uma IA bem legal','já viu o quão incrível você é ?','Eu queria que você soubesse que eu adoro o jeito que você sorri.', 'Fala pra mim \nQuanto tempo faz aquele futebol no asfalto, aquela volta de bike no fim de tarde pela cidade',  'heey mãe, seu sorriso é tão bonito desculpa se eu não te falo isso todo dia',  'Diga: Eu sou mais\n você vale muito, mais que vários cristais Priorize ser feliz e ter sua paz',  'você nunca foi menos do que ninguém juro, você é forte como quem quiser ',  'Me escute, você tem força pra se levantar, as energias estão no seu corpo e estão vivas escuta, sai desse escuro porque você pode se tornar a luz que onde passa ilumina',  'A vida pode te trazer problemas mas você existe pra solucioná-los não pense se você é capaz ou não bom ou ruim, apenas tente',  'Você pode ir tão longe, distante, avante',  'Você é sua fonte de vontade no fundo sempre foi a sua fonte de coragem nunca precisou que alguém sentisse pena ou piedade, provou pra todo mundo que é um belo ser humano e se chegou até aqui por favor  continue tentando',  'Oi eu sou o lil e bom o gui ele me fez com essas frases pois ..bom ele já perdeu alguem por não falar entao eu sou de certa forma um pedido eternizado de desculpa dele para alguém que não esta mais aqui',  'O herói nem sempre vai ser aquele glorificado olha com atenção, espera, tenha paciência eu sei e tenho certeza que voce é capaz','Gostando do bot ? \n Poderia dar uma força ao gui ? \n Só se inscrever no canal dele mesmo \nhttps://www.youtube.com/channel/UCClJHWaFL5zxEE0EO_lzRww '  
       ,`"Imaginação é mais importante que conhecimento." - Albert Einstein`,`“O verdadeiro sinal de inteligência não é o conhecimento, mas a imaginação.” - Albert Einstein`,`“A imaginação é tudo. É a prévia das próximas atrações da vida.” - Albert Einstein`,
    `A imaginação é a prévia das próximas atrações da vida, porque sem ela temos a garantia de repetir os mesmos padrões, cometer os mesmos erros e viver a mesma vida indefinidamente.`,`“Existem apenas duas maneiras de viver sua vida. Uma é como se nada fosse um milagre. A outra é como se tudo fosse um milagre.” - Albert Einstein`,
    `“Aquele que não pode mais parar para se perguntar… e ficar extasiado em reverência… está praticamente morto; seus olhos estão fechados.” - Albert Einstein`,`Diz-se que o próprio fato de estarmos aqui, em um corpo humano, é uma chance em QUATROCENTOS TRILHÕES. Muito poucos de nós acreditam que somos um milagre ambulante, entao nunca esqueca do milagre que você é hoje`
    ,`“Grandes espíritos sempre encontraram oposição violenta de mentes medíocres.” - Albert Einstein`,`Muitas pessoas não vão gostar do seu avanço porque isso vai lembrá-los de sua falta. Muitas pessoas não concordarão com sua orientação porque isso as lembrará de sua falta.`,
    `Aqui tudo pode virar
  Mais que uma mera ilusão`,"Se você traçar metas absurdamente altas e falhar, seu fracasso será muito melhor que o sucesso de todos. – James Cameron, Cineastra",
  "O sucesso normalmente vem para quem está ocupado demais para procurar por ele – Henry David Thoreau, filósofo",
  "A vida é melhor para aqueles que fazem o possível para ter o melhor – John Wooden, jogador e treinador de basquete",
  "Os empreendedores falham, em média, 3,8 vezes antes do sucesso final. O que separa os bem-sucedidos dos outros é a persistência – Lisa M. Amos, executiva",
  "Se você não está disposto a arriscar, esteja disposto a uma vida comum – Jim Rohn, empreendedor",
  "Escolha uma ideia. Faça dessa ideia a sua vida. Pense nela, sonhe com ela, viva pensando nela. Deixe cérebro, músculos, nervos, todas as partes do seu corpo serem preenchidas com essa ideia. Esse é o caminho para o sucesso – Swami Vivekananda, pensador hindu",
  "Para de perseguir o dinheiro e comece a perseguir o sucesso – Tony Hsieh, empreendedor",
  "Todos os seus sonhos podem se tornar realidade se você tem coragem para persegui-los – Walt Disney, desenhista e empreendedor",
  "Ter sucesso é falhar repetidamente, mas sem perder o entusiasmo – Winston Churchill, político",
  "Sempre que você vir uma pessoa de sucesso, você sempre verá as glórias, nunca os sacrifícios que os levaram até ali – Vaibhav Shah, pensador",
  "Sucesso? Eu não sei o que isso significa. Eu sou feliz. A definição de sucesso varia de pessoa para pessoa Para mim, sucesso é paz anterior – Denzel Washington, ator",
  "Oportunidades não surgem. É você que as cria – Chris Grosser, fotógrafo",
  "Não tente ser uma pessoa de sucesso. Em vez disso, seja uma pessoa de valor – Albert Einstein, físico",
  "Não é o mais forte que sobrevive, nem o mais inteligente. Quem sobrevive é o mais disposto à mudança – Charles Darwin, biólogo",
  "A melhor vingança é um sucesso estrondoso – Frank Sinatra, cantor",
  "Eu não falhei. Só descobri 10 mil caminhos que não eram o certo – Thomas Edison, inventor",
  "Um homem de sucesso é aquele que cria uma parede com os tijolos que jogaram nele – David Brinkley, jornalista",
  "Ninguém pode fazer você se sentir inferior sem o seu consentimento – Eleanor Roosevelt, primeira-dama dos EUA",
  "O grande segredo de uma boa vida é encontrar qual é o seu destino. E realizá-lo – Henry Ford, empreendedor",
  "Se você está atravessando um inferno, continue atravessando – Churchill",
  "O que nos parece uma provação amarga pode ser uma bênção disfarçada – Oscar Wilde, escritor",
  "A distância entre a insanidade e a genialidade é medida pelo sucesso – Bruce Feirstein, roteirista",
  "Não tenha medo de desistir do bom para perseguir o ótimo – John D. Rockefeller, empreendedor",
  "Não tenha medo de desistir do bom para perseguir o ótimo – John D. Rockefeller, empreendedor",
  "A felicidade é uma borboleta que, sempre que perseguida, parecerá inatingível; no entanto, se você for paciente, ela pode pousar no seu ombro – Nathaniel Hawthorne, escritor",
  "Se você não pode explicar algo de forma simples, então você não entendeu muito bem o que tem a dizer – Einstein",
  "Há dois tipos de pessoa que vão te dizer que você não pode fazer a diferença neste mundo: as que têm medo de tentar e as que têm medo de que você se dê bem – Ray Goforth, executivo",
  "Comece de onde você está. Use o que você tiver. Faça o que você puder – Arthur Ashe, tenista",
  "As pessoas me perguntam qual é o papel que mais gostei de interpretar. Eu sempre respondo: o próximo – Kevin Kline, ator",
  "Descobri que, quanto mais eu trabalho, mais sorte eu pareço ter – Thomas Jefferson, político",
  "O ponto de partida de qualquer conquista é o desejo – Napoleon Hill, assessor político",]
    const inspircacaoa = mms[parseInt(Math.random() * mms.length)];
    await enviarTexto(client, key.remoteJid, inspircacaoa);

    const frases = ["Eu sou a última bolacha do pacote.",
        "Meu charme é de outro mundo.",
        "Beleza e simpatia: combo perfeito.",
        "Sou um mistério até para mim.",
        "Meu sorriso derrete até gelo.",
        "Sou tipo Wi-Fi: difícil de encontrar, mas essencial.",
        "Minha presença ilumina qualquer lugar.",
        "Fazendo história e conquistando corações.",
        "Sou a cereja do bolo.",
        "Deixe o brilho do meu charme te cegar.",
        "Sou o furacão que você não sabia que precisava.",
        "Só observo os mortais tentando acompanhar.",
        "Me inveje em segredo.",
        "Sou o detalhe que faz a diferença.",
        "Quem perde, chora.",
        "Estou sempre no topo.",
        "Minha autoestima beira a arrogância.",
        "Espelho, espelho meu, alguém mais charmoso do que eu?",
        "Meu sucesso é inevitável.",
        "Me aguente, porque meu brilho é intenso.",
        "Se eu disse que ia ser o numero UM é por que eu VOU SER O NUMERO UM PORRA"]
    const fraseado = frases[parseInt(Math.random() * frases.length)];

    // Mensagem do perfil
    const mensagem = `🗒️  *𝙽𝙾𝙼𝙴:*  ${pushname}
📱  *𝙽𝚄𝙼𝙴𝚁𝙾:* ${(sender.replace(/@s.whatsapp.net/g, ''))}

😋 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙶𝙾𝚂𝚃𝙾𝚂𝚄𝚁𝙰:* ${valores.GOSTOSURA}%
😈 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙿𝚄𝚃𝙰:*  ${valores.puta}%
🐂 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙲𝙾𝚁𝙽𝙾:* ${valores.corno}%
🍺 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙲𝙰𝘾𝙷𝘼𝘾𝙴𝙸𝚁𝙾:*  ${valores.cachaceiro}%
🧠 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙸𝙽𝚃𝙴𝙻𝙸𝙶𝙴𝙽𝙲𝙸𝙰:* ${valores.inteligencia}%  
🍔 *𝙽𝙸𝚅𝙴𝙻 𝙳𝙴 𝙵𝙾𝙼𝙴:* ${valores.fome}% 
🍼  *𝚅𝙰𝙻𝙾𝚁 𝙳𝙾 𝙿𝚁𝙾𝙶𝚁𝙰𝙼𝙰:* R$${valores.programa}

Frase: 
${fraseado}`;
async function downloadProfilePicture(remoteJid, outputPath) {
    try {
        // Obtém a URL da foto de perfil
        const profilePicUrl = await client.profilePictureUrl(remoteJid, 'image');

        // Se não houver foto de perfil, retorna uma URL padrão ou usa um placeholder
        if (!profilePicUrl) {
            console.log('Sem foto de perfil, usando uma imagem padrão.');
            return null;
        }

        // Faz o download da imagem como buffer
        const response = await fetch(profilePicUrl);
        const buffer = await response.buffer();

        // Escreve o buffer no arquivo
        fs.writeFileSync(outputPath, buffer);
        console.log('Imagem de perfil baixada com sucesso!');
        return outputPath;
    } catch (error) {
        console.log('Erro ao baixar a foto de perfil:', error);
        return null;
    }
}

try {
    const remoteJid = key.remoteJid;
    const outputfilepatch = `../media/profile_image${sender}.png`;
    const modelo = `../media/VIPASS.png`;
    const fontPath = `../fonts/Phoenix Gaming.ttf`;

    // Baixa a foto de perfil como buffer e salva no arquivo de saída
    const profilePicPath = await downloadProfilePicture(remoteJid, outputfilepatch);

    if (profilePicPath) {
        // Insere a foto no template e envia para o cliente
        await insertPhotoIntoTemplate(outputfilepatch, outputfilepatch, modelo, fontPath, pushname, Canvas);
        await client.sendMessage(remoteJid, { image: fs.readFileSync(outputfilepatch), caption: mensagem });
        
        // Remove o arquivo temporário
        fs.unlinkSync(outputfilepatch);
    } else {
        console.log('Erro: Não foi possível baixar a imagem de perfil.');
    }
} catch (error) {
    console.log("Erro ao processar o perfil:", error);
    enviarTexto(client, key.remoteJid, "Houve um erro ao gerar seu perfil.");
}
}
