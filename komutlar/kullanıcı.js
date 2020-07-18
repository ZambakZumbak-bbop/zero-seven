const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = 'zs!'
let yardım = new Discord.RichEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL)
.setColor('RANDOM')
.addField('Yardım Menüsü (07) <:NewYearPanda:727851315706724392> ',`
**${prefix}avatar** : Profil Fotoğrafınızı Gösterir.  
**${prefix}ilginçbilgi** : Random İlginç Bilgiler Atar.
**${prefix}sunucubilgi** : Sunucu Hakkında Bilgiler.
**${prefix}balıktut** : Balık Tutarsınız.
**${prefix}şanslısayım** : Şanslı Sayınızı Bulmaya çalışır.
**${prefix}deprem** : En Son Depremi atar.`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: false,  
  guildOnly: false, 
  aliases: ["kullanıcı","k","üye"], 
  permLevel: 0
};
exports.help = {
  name: 'kullanıcı-yardım',
  description: 'Yetkili Komutlarını Gösterir',
  usage: 'kullanıcı'
}