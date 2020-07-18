const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("message", msg => {
  var reklam = db.fetch(`reklam_${msg.channel.id}`);
  if (reklam == "acik") {
    const reklam = [
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      "j4j"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Reklam Yapmayı Kes! ⚠")
            .then(msg => msg.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    } //Dcs Ekibi
  } else if (reklam == "kapali") {
  }
  if (!reklam) return;
});
  
//●●●●●●●●●●●●●●●BIR SUNUCUYA GIRIS ve CIKIS●●●●●●●●●●●●●●●//

client.on("guildCreate", guild => {
  let dcs_kanal = client.channels.get("727510860876087329")

 const dcs = new Discord.RichEmbed()
.setTitle("SUNUCUYA EKLENDİM")
.setColor("GREEN")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
dcs_kanal.send(dcs)
});

client.on("guildDelete", guild => {
  let dcs_kanal = client.channels.get("727510860876087329")

 const dcs = new Discord.RichEmbed()
.setTitle("SUNUCUDAN AYRILDIM")
.setColor("RED")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
dcs_kanal.send(dcs)
});
   
client.on("guildMemberAdd", async member => {
  let frenzy_ibrahim = await db.fetch(`Frenzy?Code?OtorolRol_${member.guild.id}`) 
  let frenzykanal = await db.fetch(`Frenzy?Code?OtorolKanal_${member.guild.id}`)
  if(!frenzy_ibrahim || !frenzykanal) return
  member.addRole(frenzy_ibrahim)
  client.channels.get(frenzykanal).send(`Otomatik rol verildi. Hoşgeldin ${member.user.username}!`)
  });

  client.on('message', async message => {
    const ms = require('ms');
    const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let u = message.mentions.users.first() || message.author;
    if (command === "sunucu-kur") {
    if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
    if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
        message.channel.awaitMessages(response => response.content === 'evet', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
      .then((collected) => {
     message.guild.createChannel('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
    id: message.guild.id,
    deny: ['SEND_MESSAGES']
  }])
  
          
   message.guild.createChannel('「📃」kurallar', 'text', [{
    id: message.guild.id,
    deny: ['SEND_MESSAGES']
  }])
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
   message.guild.createChannel('「📥」gelen-giden', 'text', [{
    id: message.guild.id,
    deny: ['SEND_MESSAGES']
  }])
  .then(channel =>
         channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
         message.guild.createChannel('「✅」sayaç', 'text', [{
          id: message.guild.id,
          deny: ['SEND_MESSAGES']
        }])
  .then(channel =>
               channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
               message.guild.createChannel('「💾」mod-log', 'text', [{
                id: message.guild.id,
                deny: ['SEND_MESSAGES']
              }])
              .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
              message.guild.createChannel('「🔔」duyuru', 'text', [{
                id: message.guild.id,
                deny: ['SEND_MESSAGES']
              }])
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
  
         }) 
         .then((collected) => {
          message.guild.createChannel('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
         id: message.guild.id,
       }]);
               
        message.guild.createChannel(`「💡」şikayet-öneri`, 'text')
       .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
       message.guild.createChannel(`「🚬」geceye-söz-bırak`, 'text')
       .then(channel =>
              channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
       message.guild.createChannel(`「📷」görsel-video`, 'text')
       .then(channel =>
                    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
       message.guild.createChannel(`「🤖」bot-komut`, 'text')
       .then(channel =>
                    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
       message.guild.createChannel(`「💬」sohbet`, 'text')
       .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));
  
        message.guild.createChannel(`🏆》Kurucu Odası`, "voice")
        .then(channel =>
          channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
        .then(c => {
          let role = message.guild.roles.find("name", "@everyone");
          let role2 = message.guild.roles.find("name", "Kurucu");
          
          c.overwritePermissions(role, {
              CONNECT: false,
          });
          c.overwritePermissions(role2, {
              CONNECT: true,
              
          });
      })
  
      message.guild.createChannel('|▬▬|SES KANALLARI|▬▬|', 'category', [{
        id: message.guild.id,
      }]);
  
      message.guild.createChannel(`🏆》Yönetici Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        let role3 = message.guild.roles.find("name", "Yönetici");
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
        });
        c.overwritePermissions(role3, {
            CONNECT: true,
        });
    })
  
    message.guild.createChannel(`💬》Sohbet`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  
  message.guild.createChannel(`💬》Sohbet²`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  
  message.guild.createChannel(`💬》+18 Sohbet`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      c.overwritePermissions(role, {
          CONNECT: true,
      });
  })
  
  message.guild.createChannel('|▬▬|Muzik Odaları|▬▬|', 'category', [{
    id: message.guild.id,
  }]);
  
  message.guild.createChannel(`🎵》Müzik`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|Muzik Odaları|▬▬|")))
  
  message.guild.createChannel(`🎵》Müzik²`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|Muzik Odaları|▬▬|")))
  
  message.guild.createChannel('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
    id: message.guild.id,
  }]);
  
  message.guild.createChannel(`🎮》LOL`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
   
   message.guild.createChannel(`🎮》PUBG`, 'voice')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
    message.guild.createChannel(`🎮》FORTNİTE`, 'voice')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
     message.guild.createChannel(`🎮》MİNECRAFT`, 'voice')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
      
  
  message.guild.createChannel('|▬▬|A.F.K|▬▬|', 'category', [{
    id: message.guild.id,
  }]);
  
  message.guild.createChannel(`💤》A.F.K`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|A.F.K|▬▬|")))
   
  
        message.guild.createRole({
          name: '👑 | Kurucu',
          color: 'RED',
          permissions: [
              "ADMINISTRATOR",
      ]
        })
  
        
        message.guild.createRole({
          name: '🔱 | Admin',
          color: 'BLUE',
          permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES",
              "KICK_MEMBERS"
      ]
        })
  
        message.guild.createRole({
          name: '🔧 | Moderatör',
          color: 'GREEN',
          permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES"
      ]
        })
  
        message.guild.createRole({
          name: '✨ | V.I.P',
          color: '00ffff',
        })
  
        message.guild.createRole({
          name: 'Üye',
          color: 'WHITE',
        })
  
        message.guild.createRole({
          name: '🤖 | Bot',
          color: 'ORANGE',
        })
  
         message.channel.send("✅ Gerekli Odalar Kuruldu!")
       
              })   
      
  }
  });

  client.on("channelDelete", async function(channel) {
    let kanal_koruma = await db.fetch(`kanalk_${channel.guild.id}`);
    if (kanal_koruma == "acik") {
      const log = channel.guild.channels.get("LOG KANAL ID GIRIN")
     
      if (!log) return;
      let verilcek = channel.guild.roles.get("CEZALI ROL ID GIRIN")
      if (!verilcek) return;
      let entry = await channel.guild
        .fetchAuditLogs({ type: "CHANNEL_DELETE" })
        .then(a => a.entries.first());
      
      if (entry.executor.id == channel.guild.owner.id) return;
      let kisi = channel.guild.member(entry.executor);
      await kisi.roles.forEach(x =>
        kisi.removeRole(x).then(f => kisi.addRole(verilcek))
      );
      let mu = new Discord.RichEmbed()
        .setTitle(`UYARI`)
        .setColor("RED")
        .setTimestamp() //Dcs Ekibi
        .setThumbnail(channel.guild.iconURL)
        .setFooter(channel.guild.name)
        .setDescription(
          `**\`${channel.name}\`  İsimli Kanal Silindi Ancak Kanal Koruma Sistemi Sayesinde Sunucuya Geri Yüklendi ve Kanalı Silen Kişinin Yetkileri Alındı!\n \n__▪ Kanalı Silen Kişi:__ ${entry.executor}\n__▪ Kişinin ID'si:__ \`${entry.executor.id}\`\n__▪ Kişinin Tagı:__ \`${entry.executor.tag}\`**`
        );
  
      let kategoriID = channel.parentID;
      channel.clone(this.name, true, true).then(z => {
        let chn = z.guild.channels.find(x => x.id === z.id);
        if (kategoriID) {
          chn.setParent(chn.guild.channels.find(s => s.id === kategoriID));
        }
        if (channel.type == "voice") return log.send(mu);
        let everyone = channel.guild.roles.find(x => x.name === "@everyone");
        const embed = new Discord.RichEmbed()
          .setTitle(`BİLDİRİ`)
          .setColor("RED")
          .setThumbnail(channel.guild.iconURL)
          .setFooter(channel.guild.name)
          .setTimestamp()
          .setDescription(
            `**Bu Kanal Silindi Ancak Kanal Koruma Sistemi Sayesinde Sunucuya Geri Yüklendi ve Kanalı Silen Kişinin Yetkileri Alındı!\n \n__▪ Kanalı Silen Kişi:__ ${entry.executor}\n__▪ Kişinin ID'si:__ \`${entry.executor.id}\`**`
          );
        chn.send(embed);
        log.send(mu);
        let dcs = new Discord.RichEmbed()
        .setTitle(`UYARI`)
        .setColor("RED") //Dcs Ekibi
        .setTimestamp()
        .setThumbnail(channel.guild.iconURL)
        .setFooter(channel.guild.name)
        .setDescription(
          `**\`${channel.name}\`  İsimli Kanal Silindi Ancak Kanal Koruma Sistemi Sayesinde Sunucuya Geri Yüklendi ve Kanalı Silen Kişinin Yetkileri Alındı!\n \n__▪ Kanalı Silen Kişinin ID'si:__ \`${entry.executor.id}\`\n__▪ Kişinin Tagı:__ \`${entry.executor.tag}\`**`
        );
        channel.guild.owner.send(dcs)
      });
    }
  });

  client.on("roleDelete", async role => {
    let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
      let rol = role.guild.roles.get("CEZALI ROL ID YAZIN")
      let log = role.guild.channels.get("LOG KANAL ID YAZIN")
      
      if (!rol) return;
      if (!log) return;
      const entry = await role.guild
        .fetchAuditLogs({ type: "ROLE_DELETE" })
        .then(audit => audit.entries.first());
      if (entry.executor.id == role.guild.owner.id) return;
      role.guild.createRole({
        name: role.name,
        color: role.color,
        permissions: role.permissions
      }); //Dcs Ekibi
      role.guild.roles.forEach(c => 
        role.guild
          .member(entry.executor)
          .removeRole(c)
          .then(f => role.guild.member(entry.executor).addRole(rol))
      );
      const embed = new Discord.RichEmbed()
        .setTitle(`UYARI`)
        .setFooter(role.guild.name)
        .setThumbnail(role.guild.iconURL)
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `**Bir Rol Silindi ve Sunucuya Geri Yüklendi! Rolü Silen Kişinin Tüm Yetkileri Alındı!\n \n__▪ Silinen Rol:__ \`${role.name}\`\n__▪ Rolü Silen Kişi:__ ${entry.executor}\n__▪ Kullanıcının ID"si:__ \`${entry.executor.id}\`**`
        );
      log.send(embed);
      const dcs = new Discord.RichEmbed()
        .setTitle(`UYARI`)
        .setFooter(role.guild.name)
        .setThumbnail(role.guild.iconURL)
        .setColor("RED")
        .setTimestamp() //Dcs Ekibi
        .setDescription(
          `**Bir Rol Silindi ve Sunucuya Geri Yüklendi! Rolü Silen Kişinin Tüm Yetkileri Alındı!\n \n__▪ Silinen Rol:__ \`${role.name}\`\n__▪ Rolü Silen Kişi:__ ${entry.executor.tag}\n__▪ Kullanıcının ID"si:__ \`${entry.executor.id}\`**`
        );
        role.guild.owner.send(dcs)
    }
  });

  client.on('guildMemberAdd',async member => {
    let user = client.users.get(member.id);
    let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
         const Canvas = require('canvas')
         const canvas = Canvas.createCanvas(360,100);
         const ctx = canvas.getContext('2d');
    
    const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png')
      const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png')
      const kurulus = new Date().getTime() - user.createdAt.getTime();
      const gün = moment(kurulus).format('dddd');  
      var kontrol;
        if (kurulus > 2629800000) kontrol = resim2
      if (kurulus < 2629800000) kontrol = resim1
  
         const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png');
         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
     
  //DCS EKİBİ
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
    ctx.beginPath();
      ctx.lineWidth = 4;
    ctx.fill()
      ctx.lineWidth = 4;
    ctx.arc(180, 46, 36, 0, 2 * Math.PI);
      ctx.clip();
    ctx.drawImage(avatar, 143,10, 73, 72  );
  
     if (!kanal) return
         const attachment = new Discord.Attachment(canvas.toBuffer(), 'güvenlik.png');
      kanal.send(attachment)
  });
     

  client.on("guildMemberAdd", async (codeming) => {
    let data = await db.fetch(`sayac_${codeming.guild.id}`)  
     
    if(!data) return
    let kanalveri = data.kanal
    let count = data.count  
    let ksayı = codeming.guild.memberCount
    let kanal = client.channels.get(kanalveri)
    let sayı = count-ksayı
    if(ksayı >= count) {
    kanal.send("📥 **"+codeming.user.username+"** Adlı kullanıcı **"+codeming.guild.name+"** sunucumuza giriş yaptı! :tada: Sunucu sayaç olan **"+count+"** üye sayısına ulaştı.Sayaç durduruldu! `"+count+" / "+ksayı+"`")   
    db.delete(`cesayaç_${codeming.guild.id}`)
      return
    } else {
      
    kanal.send("📥 **"+codeming.user.username+"** Adlı kullanıcı **"+codeming.guild.name+"** sunucumuza giriş yaptı! Şu anda **"+ksayı+"** üyeyiz,**"+count+"** üye olmamız için **"+sayı+"** üye kaldı!")   
       
    }
      
    })
    
    client.on("guildMemberRemove", async (codeming) => {
    let data = await db.fetch(`cesayaç_${codeming.guild.id}`)  
     
    if(!data) return
    let kanalveri = data.kanal
    let count = data.count  
    let ksayı = codeming.guild.memberCount
    let kanal = client.channels.get(kanalveri)
    let sayı = count-ksayı
    
    kanal.send("📤 **"+codeming.user.username+"** Adlı kullanıcı **"+codeming.guild.name+"** sunucumuzdan çıkış yaptı! Şu anda **"+ksayı+"** üyeyiz,**"+count+"** üye olmamız için **"+sayı+"** üye kaldı!")   
       
    
      
    })
    