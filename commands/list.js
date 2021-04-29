const { getAll } = require('../database');
module.exports = {
    name: 'list',
    description: 'list all keys from db',
    usage: '?list',
    accessableby: 'Members',
    aliases: ['ls'],
    execute(message) {
console.log('1');
    const array = await getAll();
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      console.log(i);
      console.log(array[i]);
      message.channel.send(`${array[i]}`);
    }
console.log('2');
    }
};