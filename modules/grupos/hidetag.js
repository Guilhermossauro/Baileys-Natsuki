exports.hidetag = async function hidetag(client, enviado) {
  let response
    function getGroupAdmins(participants) {
        admins = []
        for (let i of participants) {
            if (i.admin == 'admin') admins.push(i.id)
            if (i.admin == 'superadmin') admins.push(i.id)
        }
        return admins
    }

    const {mimetyped,isGroup,metadata,sender,from} = enviado;
    const mensagem =  mimetyped.command
    const commands = mensagem
    const args = commands.split(" ");
      const groupMembers = isGroup ? metadata.participants : ''
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
    if(!isGroup){
      response= {text:"Este comando só pode ser usado em grupos."}
      return     await client.sendMessage(from, response);
  }
    let alertToSend;
    let isadm= groupAdmins.includes(sender) 
    if(!isadm){
      response= {text:"Este comando só pode ser usado por administradores."}
      return     await client.sendMessage(from, response);
    }
    if (args.length !== 1) {
      alertToSend = args.slice(1).join(" ");
  } else if (commands.split('\n').length !== 1) {
      const args = commands.split('\n');
      alertToSend = args.slice(1).join("\n");
  } else {
    response= {text:"poxa eu ainda não sei a mensagem que voce quer que eu avise... preciso saber a mensagem!."}
  await client.sendMessage(sender, response)
  return
  }
      let array = []
        for (let i = 0; i < groupMembers.length; i++) {
            array.push(groupMembers[i].id)
            }
    response= {text:alertToSend,
        mentions: array
        }
    await client.sendMessage(from, response);
}

