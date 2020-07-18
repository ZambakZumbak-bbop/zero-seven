const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
  await db.delete(`guvenlik${message.guild.id}`)
  return message.channel.send("Güvenlik **sıfırlandı!**")
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 2
};
//DCS EKİBİ
exports.help = {
  name: 'güvenlik-sıfırla', 
  description: 'güvenlik sıfırlar', 
  usage: 'güvenlik-sıfırla' 
};
