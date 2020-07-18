const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("ms");
const a = require("../ayarlar.json");
const client = new Discord.Client();
exports.run = async (bot, message, args) => {
  
  let owners = ['477486420227784714']
if(!owners.includes(message.author.id)) return message.channel.send(' `Bu Komutu Sadece Sahibim Kullanabilir`');

  
  let kullanıcı = args[0]
 

  

  if (!kullanıcı) return message.channel.send(' Kullanıcının İdsini Veya Etiketini Girmelisin')
 

   
  

  
  db.delete(`gold_${kullanıcı}`, 'gold')
    

  
 

  let byembed1 = new Discord.RichEmbed()
  .setTitle("Bilgilendirme")
    .setColor("RED")
    .setFooter("Zero Seven")
    .setDescription(` ${kullanıcı} Adlı Kişi Gold Üyesi Alındı** \n Gold Üyeyi Alan Kişi ; ${owners}`)
     
  
  
  message.channel.send(byembed1) 
  
   
    

                               

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['goldal',"goldsil"],
  permLevel: 0
};
exports.help = {
  name: 'gold-sil',
  description: 'goldver',
  usage: 'goldver'
};
   