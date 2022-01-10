const fetch = require('node-fetch');

module.exports = {
  name: 'cat',
  description: 'Chesley will send an image or a gif of a cute kitten. By adding \'img\' or \'gif\' , you can choose what Chesley will send',
  usage: '?cat <image|gif>',
  accessableby: 'Members',
  aliases: ['c'],
  execute(message, args) {
    let url = 'https://api.thecatapi.com/v1/images/search?format=json&size=small';

    if (args[0]) {
      switch (args[0]) {
        case 'gif':
          url += '&mime_types=gif';
          break;
        case 'image':
          url += '&mime_types=jpg,png';
          break;
      }
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => message.channel.send(`I don't really like cats.. But here's a cute kitten for ${message.author} : ${res[0].url}`))
      //   .then((res)=> message.channel.send(res[0].url))
      .catch((e) => console.error(e));
  }
};
