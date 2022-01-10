const fetch = require('node-fetch');
module.exports = {
  name: 'dog',
  description: 'Chesley will send an image or a gif of a cute doggo. By adding \'img\' or \'gif\' , you can choose what Chesley will send',
  usage: '?dog <img|gif>',
  accessableby: 'Members',
  aliases: ['d'],
  execute(message, args) {
    let url = '';

    if (args[0]) {
      switch (args[0]) {
        case 'gif':
          url = 'https://api.thedogapi.com/v1/images/search?size=small&mime_types=gif&format=json';
          break;
        case 'img':
          url = 'https://api.thedogapi.com/v1/images/search?size=small&mime_types=jpg,png&format=json';
          break;
      }
    } else {
      url = 'https://api.thedogapi.com/v1/images/search?size=small&format=json';
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => message.channel.send(`Here's a dog for ${message.author} : ${res[0].url}`))
      //   .then((res)=> message.channel.send(res[0].url))
      .catch((e) => console.error(e));
  }
};
