const Discord = require("discord.js");
 const VexTools = require('vex-tools'),
             VEX = new VexTools("gGmCIucPkTcjysmrHLKJ05d1tH");
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json");

module.exports.run = async (bot, message, args) => {

  const altun = await VEX.deprem()
  
  const a = new Discord.RichEmbed()
  .addField(`Son Deprem`,`Depremin Gerçekleştiği yer ${altun.baslik} \n\n Derinliği ${altun.derinlik} \n\n Deprem Şiddeti ${altun.şiddeti} Gerçekleştiği Zaman ${altun.zaman}`)
  message.channel.send(a)

};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "deprem",
  description: "Son Depremi Gösterir",
  usage: "deprem"
};
   