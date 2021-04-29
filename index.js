// imports
const Discord = require('discord.js');
const fs = require('fs');

// server
const keepAlive = require('./server');


// discord client
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
// command list
client.commands = new Discord.Collection();

// config
require('dotenv').config();

// get command list
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// for each command
for (const file of commandFiles) {
    // require commandFile
    const command = require(`./commands/${file}`);
    // add to command list
    client.commands.set(command.name, command);
}

// command handler
client.on('message', async (message) => {
    //* exit if message is a DM
    if (message.author.bot || message.channel.type === 'dm') return;
    //* exit if message not start with prefix
    if (!message.content.startsWith(process.env.PREFIX)) return;

    // split message
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    // command
    const command = args.shift().toLowerCase();

    //* exit if command doesn't exist
    if (!client.commands.has(command)) return;

    try {
        // execute command
        client.commands.get(command).execute(message, args);
    }
    catch (e) {
        // error message
        console.log(`command : ${command} - error : ${e}`);
    }

});

// event handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// keep bot alive
keepAlive();
// Login
client.login(process.env.TOKEN);