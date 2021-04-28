module.exports = {
  name: 'rename',
  description: 'Rename from name1 to name2',
  usage: '-rename',
  accessableby: 'Members',
  aliases: ['rn'],
  execute(message, args) {
    message.react('\u2705')
      .then(message.react('\u274c')).then(
        message.channel.send(`renamed ${args[0]} into ${args[1] + ' ' + args[2]}`));
  }
};