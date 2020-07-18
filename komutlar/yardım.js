const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'zs!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Yardım Menüsü (07)',`
**${prefix}yetkili** : __Yetkililerin Kullanabileceği Komutlar!__ <:Love:727851315593740299>
**${prefix}bot** : __Bot Hakkındaki Bilgileri buradan Alabilirsiniz__ <:Love:727851315593740299>
**${prefix}yapımcı** : __Yapımcımın Kullanacağı Komutlar!__ <:Love:727851315593740299>
**${prefix}gold-üye** : __Gold Üyelerin Kullanabileceği Özel Komutlar(Çok Yakında)__ <:Love:727851315593740299>
**${prefix}kullanıcı** : __Herkesin Kullanabileceği Komutlar__ <:Love:727851315593740299>`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.addField('Linkler:',`[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=727483284417937509&scope=bot&permissions=8) | [Destek Sunucumuz](https://discord.gg/mbuu5pZ) | [YAKINDA!]`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: false,  
  guildOnly: false, 
  aliases: ["help"], 
  permLevel: 0
};
exports.help = {
  name: "yardım",
  description: "Yardım Komutu",
  usage: "yardım"
};
