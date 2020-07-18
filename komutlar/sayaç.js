const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db")
var generator = require('generate-password');
exports.run = async(client, message, args) => {

if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(":x: Bu komutu kullanmak için yeterli yetkiye sahip değilsin!") 

let codemingdb = await db.fetch(`cesayaç_${message.guild.id}`) 
let kanal = message.mentions.channels.first() || message.guild.channels.get(args[0])  
let count = args[1]

if(!kanal && !count) return message.channel.send("Bir şeyleri eksik yazdın! Örnek kullanım: `zs!sayaç-ayarla #sayaç-kanalı 1000`")
if(isNaN(count)) return message.channel.send("Bir şeyleri yanlış yazdın! Örnek kullanım: `zs!sayaç-ayarla #sayaç-kanalı 1000`")

if(message.guild.memberCount > count) return message.channel.send("Sayaç sayısı olan **"+count+"** Sayısı sunucu üyesinden az.Daha yüksek bir sayı yaz!") 
  
message.channel.send("✅ Sayaç kanalı "+kanal+"; Sayaç miktarı **"+count+"** olarak ayarlandı! Bu sayıya ulaşıldığında sayaç otomatik duracak.")  

try {
 client.channels.get(kanal.id).send("Sayaç bu kanalda aktif edildi!") 
} catch(e) {
 message.channel.send(kanal+" Kanalına mesaj gönderemiyorum.Sayaç ayarlanamadı!") 
return
} 
 
db.set(`sayac_${message.guild.id}`, {kanal: kanal.id,count: count})  
  
 
  
  

}

exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [], 
permLevel: 0
};

exports.help = {
name: 'sayaç-ayarla',
description: 'Komutun Açıklaması',
usage: 'sayaç-ayarla'
}
