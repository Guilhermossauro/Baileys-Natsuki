//Caso for criar um comando voce precisar declarar ele aqui como os modelos a baixo//
//Aqui voce inclue as pastas que voce deixou o comando que voce criou //
//===============||modulos gerais||===============//
const { menu } = require("./modules/menu");
const {s} = require('./modules/geral/s')
const {clima} = require('./modules/geral/clima')
const {tts} = require('./modules/geral/tts')
//===============||modulos grupos||===============//
const {ban} = require('./modules/grupos/ban')
const { sorte } = require("./modules/grupos/sorte");
const { beleza } = require("./modules/grupos/beleza");
const { bunda } = require("./modules/grupos/bunda");
const { carisma } = require("./modules/grupos/carisma");
const { inteligencia } = require("./modules/grupos/inteligencia");
const {linkdogrupo} = require('./modules/grupos/linkdogrupo')
const {couple} = require('./modules/grupos/couple')
const {add} = require('./modules/grupos/add')
const {hidetag} = require('./modules/grupos/hidetag')
const {shape} = require('./modules/grupos/shape')
const {promover} = require('./modules/grupos/promover')
const {confiabilidade} = require('./modules/grupos/confiabilidade')
const {gravidez} = require('./modules/grupos/gravidez')
const {pau} = require('./modules/grupos/pau')
//===============||modulos download||===============//

//=======================================================//
const commands = {}
//Aqui voce inclue o nome para o comando esse que voce coloca antes da => seria o nome do comando
//exemplo: commands.menu= (client,key) => menu(client,key) se voce trocar esse menu por qualquer outra coisa
// o comando menu tera outro nome por exemplo help seria  commands.help= (client,key) =>menu(client,key)
//==============================||modulos gerais||==============================//
commands.menu= (client,key) => menu(client,key)
commands.clima= (client,key) => clima(client,key)
commands.s= (client,key) => s(client,key)
commands.tts= (client,key) => tts(client,key)
//==============================||modulos grupos||==============================//
commands.hidetag= (client,key) => hidetag(client,key)
commands.sorte= (client,key) => sorte(client,key)
commands.beleza= (client,key) => beleza(client,key)
commands.bunda= (client,key) => bunda(client,key)
commands.carisma= (client,key) => carisma(client,key)
commands.inteligencia= (client,key) => inteligencia(client,key)
commands.linkdogrupo= (client,key) => linkdogrupo(client,key)
commands.link= (client,key) => linkdogrupo(client,key)
commands.gravidez= (client,key) => gravidez(client,key)
commands.pau= (client,key) => pau(client,key)
commands.confiabilidade= (client,key) => confiabilidade(client,key)
commands.trust= (client,key) => confiabilidade(client,key)
commands.couple= (client,key) => couple(client,key)
commands.shape= (client,key) => shape(client,key)
commands.par= (client,key) => couple(client,key)
commands.add= (client,key) => add(client,key)
commands.ban= (client,key) => ban(client,key)
commands.promover= (client,key) => promover(client,key)
module.exports = commands;

