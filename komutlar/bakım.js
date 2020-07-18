const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {

if(message.author.id !== ayarlar.sahip) return message.channel.send("Bu komutu sahibim kullanabilir!")
let argüman = args
if(argüman[0] !== "aç" && argüman[0] !== "kapat") return message.channel.send("Lütfen `aç` veya `kapat` diye seçenek belirt!")
let cveri = db.fetch(`cbakım`)


if(argüman[0] === "aç") {
if(cveri) return message.channel.send("Bot zaten bakımda!")
let sebep = argüman.slice(1).join(' ')
if(!sebep) return message.channel.send("Lütfen bir sebep belirtin!")

message.channel.send('Bot başarıyla `'+sebep+'` sebebinden bakıma alındı!')
db.set(`cbakım`, sebep)
return  
}

if(argüman[0] === "kapat") {
if(!cveri) return message.channel.send("Bot zaten bakımda değil!")

message.channel.send("Bot başarıyla bakımdan çıkarıldı!")
db.delete(`cbakım`)
return  
}

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'bakım',
    description: 'Bakıma ALır Botu',
    usage: 'bakım'
  };