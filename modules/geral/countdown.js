exports.contardias= async function contardias (client, message, ) {
    const { id, from, body,caption } = message;
    const commands = caption || body || "";
    const args = commands.split(" ");
    diador= args.slice(1).join(" ");
    let day = (diador.replace(/[^1234567890/]/gi, ''))
    let filtro =(day.replace(/[^\w\s]/gi, ','))
    let selectedday = filtro.split(",")
    const ano = selectedday[2]
    const mes =selectedday[1]
    const dia1= selectedday[0]
    
    let dataAtual = new Date();
    let diapassado= new Date(`${ano},${mes},${dia1}`)
    
    if (isNaN(Date.parse(diapassado))) return client.reply(from,'Desculpa, mas a data que você colocou é inválida.\n tente seguir o padrão DD/MM/AAA', id);
    if (diapassado < dataAtual) return client.reply(from,'Desculpa, mas a data que você colocou é inválida. Tente colocar uma data após a data atual.', id);

    let dataemmilissegundos= Math.abs(dataAtual.getTime() - diapassado.getTime())
    let diasdediferenca= Math.ceil(dataemmilissegundos / (1000 * 60 * 60 * 24 ))
    const resultado = `faltam *${diasdediferenca}* dias para esta data\n`;
    await client.reply(from, resultado, id);  
     
}