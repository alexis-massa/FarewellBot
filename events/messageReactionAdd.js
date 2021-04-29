const Discord = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    execute: async (reaction, user) => {

        // try to get reaction
        try {
            await reaction.fetch();
        } catch (e) {
            console.log(`event : messageReactionAdd - error : ${e}`);
            return;
        }

        // log event
        console.log(`${user} in #${reaction.message.channel.name} reacted with : ${reaction.emoji.name}`);


        // get reaction member
        reaction.message.guild.members.fetch(user.id).then(member => {
            //
            if (!(user.id === reaction.message.author.id) && member.hasPermission('ADMINISTRATOR')) {
                console.log('admin reacted');
                // console.log(reaction.message.embeds[0].fields[0].value === );
                if (reaction.emoji.name == '\u2705') {
                    validate(reaction);
                    return;
                }
                if (reaction.emoji.name == '\u274c') {
                    refuse(reaction);
                    return;
                }
                if (user.id === reaction.message.embeds[0].fields[0].value.slice(2, reaction.message.embeds[0].fields[0].value.length - 1) && reaction.emoji.name == '🚫') {
                    console.log('author reacted');
                    cancel(reaction);
                    return;
                }
            } else {
                // not admin and not author
                // console.log('non-authorized reacted');
            }
        });
    }
};

// TODO : remove other reactions
function validate(reaction) {
    console.log('ok');
    // { name: 'status', value: 'Accepted', inline: false }
    console.log(reaction.message.embeds[0].fields[3]);
    const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
        .spliceFields(3, 1, { name: 'status', value: '`Accepted`', inline: false });
    reaction.message.edit(newMsg);
}
// TODO : remove other reactions
function refuse(reaction) {
    console.log('not ok');
    // { name: 'status', value: 'Refused', inline: false }
    console.log(reaction.message.embeds[0].fields[3]);
    const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
        .spliceFields(3, 1, { name: 'status', value: '`Refused`', inline: false });
    reaction.message.edit(newMsg);
}
// TODO : remove other reactions
function cancel(reaction) {
    console.log('cancel');
    // { name: 'status', value: 'Cancelled', inline: false }
    console.log(reaction.message.embeds[0].fields[3]);
    const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
        .spliceFields(3, 1, { name: 'status', value: '`Cancelled`', inline: false });
    reaction.message.edit(newMsg);
}