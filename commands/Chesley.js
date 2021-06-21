module.exports = {
  name: 'chesley',
  description: 'Barks',
  usage: '?Chesley',
  accessableby: 'Members',
  aliases: ['c'],
  execute(message) {
    message.channel.send('Bark');
  }
};