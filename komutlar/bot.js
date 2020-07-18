const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'zs!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Yardım Menüsü (07) <:NewYearPanda:727851315706724392> ',`
**${prefix}bug** : Bug Bildirip Ödül Kazanabilirsiniz.
**${prefix}öneri** : Bota Öneriler Verirsiniz.
**${prefix}istatistik** : Botun Kaç Sunucuda vs. Olduğunu Görebilirsiniz.
**${prefix}ping** : Botun Anlık Mesaj Tepkimesini Gösterir.`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: false,  
  guildOnly: false, 
  aliases: ["bot","by","botyardım"], 
  permLevel: 0
};
exports.help = {
  name: 'bot-yardım',
  description: 'Yetkili Komutlarını Gösterir',
  usage: 'bot'
}