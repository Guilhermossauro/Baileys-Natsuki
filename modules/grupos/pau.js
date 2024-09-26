const { reagir, responderComMencoes,responderTexto } = require("../../sockets");

exports.pau = async function pau(client, enviado) {
const { key, isGroup, sender } = enviado;
const from = key.remoteJid;
const lista= [sender]
if (!isGroup) {
     await responderTexto(client, from, "Este comando só pode ser usado em grupos.", enviado);
     return;
 }
let confiometro =  parseInt(Math.random() * 75 + 1);
for (let i= 0; i<6 && confiometro >28;i++){
    confiometro =  parseInt(Math.random() * 75 + 1);
        if(confiometro> 30 && i<=3){
            confiometro = confiometro -5
                 }
   }
const ar = `Então @${sender.replace(/@s.whatsapp.net/g, '')} ,\n *O seu pau tem ${confiometro}cm*`
await responderComMencoes(client, from, ar,lista,enviado);
  let retorno;

  if (confiometro > 8 && confiometro < 12) { 
      retorno = "A sua espada, meu guerreiro, foi categorizada como adaga";
  } else if (confiometro >= 1 && confiometro < 8) { 
      retorno = "Sinto lhe informar isso mas, você possui um canivete de bolso";
  } else if (confiometro > 13 && confiometro < 19) {
      retorno = "Parabéns meu amigo, você está na média pelo menos né";
  } else if (confiometro > 23 && confiometro < 28) {
      retorno = "Isso não é uma espada, é uma lança, meu guerreiro";
  } else if (confiometro > 29 && confiometro < 46) {
      retorno = "Olá Kid Bengala";
  } else if (confiometro > 46 && confiometro < 87) {
      retorno = "Isso é uma vara de catar manga";
  }
  await responderComMencoes(client, from, retorno,lista,enviado);
}
