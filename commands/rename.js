const Discord = require('discord.js');
module.exports = {
  name: 'rename',
  description: 'Rename from name1 to name2',
  usage: '-rename',
  accessableby: 'Members',
  aliases: ['rn'],
  // TODO : adapt to get 2 or 3 args and error in more
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Rename')
      .setColor('#5900ff')
      .setDescription('Rename demand.')
      .addFields([
        { name: 'asked by ', value: `<@${message.author.id}>`, inline: true },
        { name: 'from', value: `\`${args[0]}\``, inline: true },
        { name: 'to', value: `\`${args[1]} ${args[2]}\``, inline: true },
        { name: 'status', value: '`waiting for admin`', inline: false }
      ])
      .setTimestamp();

    message.channel.send({ embed })
      .then(newMsg => {
        // :white_mark_check:
        newMsg.react('\u2705');
        // :x:
        newMsg.react('\u274c');
        // :no_entry_sign:
        newMsg.react('🚫');
      });
    // ? delete command message?
    // .then(message.delete({ reason: 'deleted by bot' }));
  }
};