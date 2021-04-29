const Discord = require('discord.js');

module.exports = {
  name: 'rename',
  description: 'Rename from name1 to name2',
  usage: '-rename',
  accessableby: 'Members',
  aliases: ['rn'],
  execute(message, args) {

    const embed = new Discord.MessageEmbed()
      .setTitle('Rename')
      .setColor('#5900ff')
      .setDescription('Rename demand.')
      // TODO : add info fields here
      .addFields([
        { name: 'asked by ', value: `<@${message.author.id}>`, inline: false },
        { name: 'from', value: `${args[0]}`, inline: false },
        { name: 'to', value: `${args[1]} ${args[2]}`, inline: false },
        { name: 'status', value: '_*waiting for admin*_', inline: false }
      ])
      .setTimestamp();


    message.channel.send({ embed })
      .then(newMsg => {
        newMsg.react('\u2705');
        newMsg.react('\u274c');
        newMsg.react('🚫');
      }).then(message.delete({ reason: 'deleted by bot' }));
  }
};