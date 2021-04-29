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
        { name: 'from', value: 'value', inline: true },
        { name: 'to', value: 'value', inline: true },
        { name: 'status', value: 'wait', inline: true }
      ])
      .setTimestamp();

    message.channel.send({ embed })
      .then(newMsg => {
        newMsg.react('\u2705');
        newMsg.react('\u274c');
        newMsg.react('🚫');
      }).then(message.delete({ reason: 'deleted by bot' }));

    // message.channel.send(`${message.author.tag} rename ${args[0]} to ${args[1] + ' ' + args[2]} (waiting for confirmation)`);

  }
};