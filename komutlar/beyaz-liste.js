const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(cclient, message, args) => {

if(message.author.id !== ayarlar.sahip) return message.channel.send("Bu komutu sahibim kullanabilir.")

let cuser = message.mentions.users.first() || cclient.users.get(args[0])
if(!cuser) return message.channel.send("Lütfen bir kullanıcı belirt")

message.channel.send("**"+cuser.tag+"** kullanıcısı karalisteden çıkarıldı.")
db.delete(`ckaraliste.${cuser.id}`)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'beyazliste',
    description: 'KaraListeden Çıkartırsın',
    usage: 'beyazliste '
  };