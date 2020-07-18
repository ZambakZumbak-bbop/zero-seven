const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'zs!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Yardım Menüsü (07) <:NewYearPanda:727851315706724392> ',`
**${prefix}yavaş-mod** : Sohbete yazma sınır (süre) ekler.  
**${prefix}reklamkoruması** : Reklam Engelleme Sistemi!
**${prefix}otorol** : Otorol Açma Sistemi.
**${prefix}kick** : Belirttiğiniz Kişiyi Sunucudan Atar.
**${prefix}ban** : Belirttiğiniz Kişiyi Sunucudan Engeller.
**${prefix}rol-koruma** : Rol Koruma Sistemi Rollerinizi Korur!
**${prefix}kanal-koruma** : Silinen Kanalı Geri Getirir.
**${prefix}mute** : Bellirtiğiniz Kişiye Mute atar.
**${prefix}güvenlik** : Güvenlik Sistemi`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: false,  
  guildOnly: false, 
  aliases: ["yetki","y","yetkili"], 
  permLevel: 0
};
exports.help = {
  name: 'yetkili-yardım',
  description: 'Yetkili Komutlarını Gösterir',
  usage: 'yetkili'
}