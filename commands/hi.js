module.exports = {
    name: 'hi',
    description: 'Says "hi"',
    usage: '-hi',
    accessableby: 'Members',
    aliases: ['h'],
    execute(message) {
        message.channel.send('Hello');
    },
};