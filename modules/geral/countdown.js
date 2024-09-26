const { responderTexto } = require("../../sockets");
exports.contardias = async function contardias(client, message) {
    const { id, from, mimetyped } = message;
    const mensagem =  mimetyped.command
    const commands = mensagem
    const args = commands.split(" ");

    if (args.length < 3) {
        return responderTexto(client, from, 'Por favor, use o formato:\n\n1. *!contardias somar <número>* (para somar dias à data atual)\n2. *!contardias to DD/MM/AAAA* (para calcular os dias restantes até uma data)', id);
    }

    const action = args[1].toLowerCase();
    const param = args[2];

    let dataAtual = new Date();

    if (action === 'somar') {
        const diasASomar = parseInt(param);
        if (isNaN(diasASomar) || diasASomar <= 0) {
            return responderTexto(client, from, 'Por favor, insira um número válido de dias para somar.', id);
        }
        let novaData = new Date(dataAtual);
        novaData.setDate(novaData.getDate() + diasASomar);
        const dia = String(novaData.getDate()).padStart(2, '0');
        const mes = String(novaData.getMonth() + 1).padStart(2, '0'); // Meses são indexados de 0 a 11
        const ano = novaData.getFullYear();
        const resultado = `Daqui a *${diasASomar}* dias,\n será *${dia}/${mes}/${ano}*.`;
        await responderTexto(client, from, resultado, id);
    } 
    else if (action === 'to') {
        let day = param.replace(/[^0-9/]/g, ''); 
        let selectedDay = day.split("/");
        if (selectedDay.length !== 3) {
            return responderTexto(client, from, 'Desculpa, mas a data que você colocou é inválida.\nTente seguir o padrão DD/MM/AAAA.', id);
        }
        const [dia1, mes, ano] = selectedDay;
        let dataSelecionada = new Date(`${ano}-${mes}-${dia1}`);

        if (isNaN(dataSelecionada.getTime())) {
            return responderTexto(client, from, 'Desculpa, mas a data que você colocou é inválida.\nTente seguir o padrão DD/MM/AAAA.', id);
        }
        if (dataSelecionada < dataAtual) {
            return responderTexto(client, from, 'Desculpa, mas a data que você colocou já passou. Tente colocar uma data futura.', id);
        }
        let diferencaEmMilissegundos = dataSelecionada.getTime() - dataAtual.getTime();
        let diasDeDiferenca = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
        const resultado = `Faltam *${diasDeDiferenca}* dias para essa data.`;
        await responderTexto(client, from, resultado, id);
    } else {
        responderTexto(client, from, 'Comando inválido! Use:\n\n1. *!contardias somar <número>* (para somar dias à data atual)\n2. *!contardias to DD/MM/AAAA* (para calcular os dias restantes até uma data)', id);
    }
};
