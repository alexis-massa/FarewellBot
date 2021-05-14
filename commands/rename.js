const Discord = require('discord.js');
module.exports = {
  name: 'rename',
  description: 'Rename from name1 to name2',
  usage: '-rename',
  accessableby: 'Members',
  aliases: ['rn'],
  execute(message, args) {
    let override_name = '';
    for (let i = 1; i < args.length; i++) {
      override_name += args[i] + ' ';
    }
    const embed = new Discord.MessageEmbed()
      .setTitle('Rename')
      .setColor('#5900ff')
      .setDescription('Rename demand.')
      .addFields([
        { name: 'asked by ', value: `<@${message.author.id}>`, inline: true },
        { name: 'from', value: `\`${args[0]}\``, inline: true },
        { name: 'to', value: `\`${override_name}\``, inline: true },
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
      })
      .then(message.delete({ reason: 'deleted by bot' }));
  }
};