exports.modelo = async function modelo(client, enviado) {
  //sempre que criar um comando altere o nome do mesmo para preferencialmente o nome do arquivo que voce criou 
  // facilita para voce indenticar ele em comandos.js

  const response= {text:'Texto para resposta a enviar ao usuario'}
    const {message,isGroup2, metadata,sender,mimetyped } = enviado;
    //metadata é apenas informacoes gerais do grupo serve para verificar adm, nome do grupo e etc
    let body= mimetyped
    const mensagem =  body.command
    //mensagem é exatamente o que o usuario digitou mesmo se ele enviar uma midia junto da mensagem
     const {pushname, remoteJid} = enviado.key;
     //remoteJid é o numero do usuario e pushname o nome do mesmo

     //aqui ele faz o envio da mensagem que voce configurou
     await client.sendMessage(sender, response)
};
