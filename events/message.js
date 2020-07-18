const db = require("quick.db");
const ayarlar = require('../ayarlar.json');
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    
    let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
  if(karaliste) return message.channel.send(`**${karaliste}** sebebiyle karalisteye alınmışsın!`)

    let veri = db.fetch(`cbakım`)
  if(veri) {
  if(message.author.id !== ayarlar.sahip) {
   return message.channel.send('Bot **'+veri+'** sebebinden dolayı bakımda!') 
  } 
  }
  
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};