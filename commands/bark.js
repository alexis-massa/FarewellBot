module.exports = {
  name: 'bark',
  description: 'Barks',
  usage: '?bark',
  accessableby: 'Members',
  aliases: ['b'],
  execute(message) {
    message.channel.send('Bark');
  }
};