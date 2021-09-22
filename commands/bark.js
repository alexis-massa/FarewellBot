module.exports = {
  name: 'bark',
  description: 'Chesley barks back',
  usage: '?bark',
  accessableby: 'Members',
  aliases: ['b'],
  execute(message) {
    message.channel.send('Bark');
  }
};