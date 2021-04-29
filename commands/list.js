const { getAll } = require('../database');
module.exports = {
    name: 'list',
    description: 'list all keys from db',
    usage: '?list',
    accessableby: 'Members',
    aliases: ['ls'],
    execute(message) {
        const array = getAll();
        let msg = '';
        for (let i = 0; i < array.length; i++) {
            msg += ' ' + array[i] + ' ';
        }
        message.channel.send(msg);
    }
};