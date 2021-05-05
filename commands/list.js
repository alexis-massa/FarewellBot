const { getAllValues } = require('../database');
module.exports = {
    name: 'list',
    description: 'list all keys from db',
    usage: '?list',
    accessableby: 'Members',
    aliases: ['ls'],
    execute(message) {
        getAllValues().then(pairs => {
            message.channel.send(pairs);
            // for (const key in pairs) {
            // }
        });
    }
};