const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'zs!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Yardım Menüsü (07) <:NewYearPanda:727851315706724392> ',`
**${prefix}karaliste** : Bot Onların Hiç Bir Komutuna Tepki Vs. Vermez 
**${prefix}reboot** : Botu Yeniden Başlatmama yarar.
**${prefix}beyazliste** : Karalisteden Çıkartmaya yarar.
**${prefix}bakım** : Botu Bakıma Alırım.
**Başka Komut Kullanamıyorum Sizinle Eş değerim Gelin sarılalım...<:PandaLove:727851315690209290>**`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: false,  
  guildOnly: false, 
  aliases: ["yapımcı","yy","yapım"], 
  permLevel: 0
};
exports.help = {
  name: 'yapımcı-yardım',
  description: 'Yetkili Komutlarını Gösterir',
  usage: 'yapımcı'
}