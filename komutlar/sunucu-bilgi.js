const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        ":warning: Uyarı :warning:",
        "`sunucubilgi` Adlı Komutu Özel Mesajlarda Kullanamazsın!"
      );
    return message.author.sendEmbed(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
  const guild = message.guild.id
    var tarih = ''
            if(moment(guild.createdAt).format('MM') === '01') {
                var tarih = `${moment(guild.createdAt).format('DD')} Ocak ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '02') {
                var tarih = `${moment(guild.createdAt).format('DD')} Şubat ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '03') {
                var tarih = `${moment(guild.createdAt).format('DD')} Mart ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '04') {
                var tarih = `${moment(guild.createdAt).format('DD')} Nisan ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '05') {
                var tarih = `${moment(guild.createdAt).format('DD')} Mayıs ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '06') {
                var tarih = `${moment(guild.createdAt).format('DD')} Haziran ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '07') {
                var tarih = `${moment(guild.createdAt).format('DD')} Temmuz ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '08') {
                var tarih = `${moment(guild.createdAt).format('DD')} Ağustos ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '09') {
                var tarih = `${moment(guild.createdAt).format('DD')} Eylül ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '10') {
                var tarih = `${moment(guild.createdAt).format('DD')} Ekim ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '11') {
                var tarih = `${moment(guild.createdAt).format('DD')} Kasım ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(guild.createdAt).format('MM') === '12') {
                var tarih = `${moment(guild.createdAt).format('DD')} Aralık ${moment(guild.createdAt).format('YYYY HH:mm:ss')} `
            }
  
    const sunucubilgi = new Discord.RichEmbed()
      .setColor("DARK")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("👑 Sunucu Sahibi", message.guild.owner)
    .addField("🔖 Sunucu Adı", message.guild.name)
      .addField("🆔 Sunucu ID", message.guild.id)
      .addField("🎭 Rol Sayısı", message.guild.roles.size)
      .addField(
        "🏰 Kanal Sayısı",
        message.guild.channels.size
      )
      .addField("😍 Emoji Sayısı", message.guild.emojis.size)
      .addField("🌍 Sunucu Bölgesi", message.guild.region)
      .addField("🗽 Üye Sayısı", message.guild.memberCount)
      .addField(
        "🔇 AFK Kanalı", message.guild.afkChannel
      )
    .addField('⏰ AFK Zaman Aşımı', message.guild.afkTimeout)
    .addField('☑ Sistem Mesaj Kanalı ', message.guild.systemChannel)
      
      .addField("🔻 Oluşturulma Tarihi", `${tarih}`)
      .setThumbnail(message.guild.iconURL);
    return message.channel.sendEmbed(sunucubilgi);
    message.react("😂");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu", "sunucu-bilgi", "sbilgi","server","server-bilgi","sbilgi","serverinfo","server-info"],
  permLevel: 0
};

exports.help = {
  name: "sunucubilgi",
  description: "Sunucu hakkında bilgi verir.",
  usage: "sunucubilgi"
};
   