const discord = require("discord.js");
const ms = require("ms")

module.exports.run = async(bot, message, args) =>{

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

   if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

   if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

   var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

   if (!mutePerson) return message.reply("Kan de gebruiker niet vinden.");

   if(mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("kan daze gebruiker niet warnen vanwege dat hij specaile perms heeft.");

   var MuteRole = message.guild.roles.cache.find(rl => rl.name === 'mute') || message.guild.roles.cache.find(rl => rl.name === 'Mute');
   if(!MuteRole) return message.reply("kan role mute niet vinden");

   var muteTime = args[1];
   if(!muteTime) message.cannel.send("geef een tijd op");

   await(mutePerson.roles.add(MuteRole));


   setTimeout(() => {
       mutePerson.roles.remove(MuteRole);



   }, ms(muteTime));

  }
  
  module.exports.help ={
    name: "tempmute",
    description: "mute iemand voor een bepaalde tijd",
    category: "algemeen"
}
