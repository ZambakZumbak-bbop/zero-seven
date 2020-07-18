const Discord = require('discord.js');

exports.run = function(client, message, args) {

    var öneri = args.slice(0).join(' ');
    var guildID = "727510860196741160";
    var channelID = "727510860657852513";
    
    if (!öneri){
        return message.reply("Bir Mesaj Belirtin!");
    } else {
        
        var embed = new Discord.RichEmbed()
            .setTimestamp()
            .addField("Eylem:", "Bug")
            .addField("Kullanıcı:", message.author.tag)
            .addField("ID", message.author.id)
            .addField("Bildiri", öneri)
        
        client.guilds.get(guildID).channels.get(channelID).send(embed);
        message.channel.send("Bulduğunuz Açık Alınmıştır! Teşekkür Ederiz! ||(Eğer Doğruysa Size özel Bir Ödül Verilecektir)||");
    };

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bug-bildir"], 
  permLevel: 0 
};

exports.help = {
  name: 'bildir', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'bildir <mesaj>' 
};