const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
  name: 'chesley',
  description: 'Chesley answers to his name, \'help\' will provide help about all the commands',
  usage: '?Chesley <help>',
  accessableby: 'Members',
  aliases: ['c'],
  execute(message, args) {
    if (args[0] == 'help') {
      this.help(message);
      return;
    }
    message.channel.send('Bark');
  },
  help: (message) => {
        const embed = new Discord.MessageEmbed().setTitle('Help');

    // get command list
    const commandFiles = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith('.js'));
    // for each command
    for (const file of commandFiles) {
          // require commandFile
        const command = require(`./${file}`);
        embed.addField(command.usage, command.description);
    }

    message.channel.send(embed);
  }
};
