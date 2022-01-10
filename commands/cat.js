const fetch = require('node-fetch');
const header = { 
 }
module.exports = {
  name: 'cat',
  description: 'Chesley will send an image or a gif of a cute kitten. By adding \'img\' or \'gif\' , you can choose what Chesley will send',
  usage: '?cat <image|gif>',
  accessableby: 'Members',
  aliases: ['c'],
  execute(message, args) {
    let url = '';


    if (args[0]) {
      switch (args[0]) {
        case 'gif':
          url = 'https://api.thecatapi.com/images/search?api_key=763bbd47-fd16-4b6d-800b-6fa3e6ae172c&size=med&mime_types=gif&format=json&';
          break;
        case 'image':
          url = 'https://api.thecatapi.com/images/search?api_key=763bbd47-fd16-4b6d-800b-6fa3e6ae172c&size=med&mime_types=jpg,png&format=json&';
          break;
      }
    } else {
      url = 'https://api.thedogapi.com/v1/images/search?api_key=763bbd47-fd16-4b6d-800b-6fa3e6ae172c&size=med&format=json';
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => message.channel.send(`I don't really like cats.. But here's a cute kitten for ${message.author} : ${res[0].url}`))
      //   .then((res)=> message.channel.send(res[0].url))
      .catch((e) => console.error(e));
  }
};
