module.exports = {
    name: 'reaction',
    execute(reaction, user) {
        console.log(`${user} in #${reaction.message.channel.name} reacted with : ${reaction}`);
    }
};