//Komutlar/kanal-koruma.js Dosyasına Atılacaktır!

const Discord = require("discord.js");
const db = require("quick.db");
const a = require("../ayarlar.json");

exports.run = async (client, message, args, params) => {
  //Dcs Ekibi
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`UYARI`)
        .setDescription(
          "**Bu Komutu Kullanmak için `YÖNETİCİ` Yetkisine Sahip Olmalısın!**"
        )
        .setColor("RED")
        .setFooter(message.author.tag)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
    );

  if (!args[0])
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`UYARI`)
        .setDescription("**Yanlış Komut Kullanımı!**")
        .setFooter(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .addField(
          `Doğru Kullanım`,
          `\`${a.prefix}kanal-koruma aç\` **veya** \`${a.prefix}kanal-koruma kapat\``
        )
        .setColor("RED")
    );

  let rol = await db.fetch(`kanalk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setTitle(`UYARI`)
        .setDescription("**__Kanal Koruma Sistemi__ Zaten Aktif!**")
        .setTimestamp() //Dcs Ekibi
        .setFooter(message.guild.name)
        .setThumbnail(message.guild.iconURL);
      message.channel.send(embed);
      return;
    } else {
      db.set(`kanalk_${message.guild.id}`, "acik");
      const embed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setTitle(`BAŞARILI`)
        .setDescription(
          "**__Kanal Koruma Sistemi__ Başarıyla Aktif Edildi!\n \n▪ Kapatmak için: `zs!kanal-koruma kapat`**"
        )
        .setFooter(message.guild.name)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL);

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    await db.delete(`kanalk_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle(`BAŞARILI`)
      .setDescription(
        "**__Kanal Koruma Sistemi__ Başarıyla Kapatıldı!\n \n▪ Açmak için: `zs!kanal-koruma aç`**"
      )
      .setTimestamp()
      .setFooter(message.guild.name)
      .setThumbnail(message.guild.iconURL);
    message.channel.send(embed);
  }

};

exports.conf = {
  enabled: true,
  aliases: ["kk"],
  permLevel: 0
};
//Dcs Ekibi
exports.help = {
  name: "kanal-koruma",
  description: "Kanal Koruma Sistemi!",
  usage: "kanal-koruma"
};