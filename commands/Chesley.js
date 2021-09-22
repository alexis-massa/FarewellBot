module.exports = {
  name: 'chesley',
  description: 'Chesley answers to his name, \'help\' will provide help about all the commands',
  usage: '?Chesley <help>',
  accessableby: 'Members',
  aliases: ['C'],
  execute(message) {
    message.channel.send('Bark');
  }
};