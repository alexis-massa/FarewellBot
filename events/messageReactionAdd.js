const Discord = require('discord.js');

module.exports = {
    name: 'messageReactionAdd',
    execute: async (reaction, user, client) => {
        // try to get reaction
        try {
            await reaction.fetch();
        } catch (e) {
            console.log(`event : messageReactionAdd - error : ${e}`);
            return;
        }

        // log event
        // console.log(`${user} in #${reaction.message.channel.name} reacted with : ${reaction.emoji.name}`);


        // Handle added reaction
        reaction.message.guild.members.fetch(user.id).then(member => {
            if (!(user.id === reaction.message.author.id) && member.hasPermission('ADMINISTRATOR')) {
                if (reaction.emoji.name == '\u2705') {
                    validate(user, reaction, client);
                    return;
                }
                if (reaction.emoji.name == '\u274c') {
                    refuse(reaction);
                    return;
                }
                if (user.id === reaction.message.embeds[0].fields[0].value.slice(2, reaction.message.embeds[0].fields[0].value.length - 1) && reaction.emoji.name == '🚫') {
                    cancel(reaction);
                    return;
                }
            }
        });
    }
};

/**
 * accept rename (ADMIN only)
 * @param {Discord.User} user user that reacted
 * @param {Discord.MessageReaction} reaction added reaction
 * @param {Discord.Client} client discord client
 */
async function validate(user, reaction, client) {
    const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
        .spliceFields(3, 1, { name: 'status', value: '`Accepted`', inline: false });
    reaction.message.edit(newMsg).then(message => {
        // remove other reactions
        message.reactions.removeAll(reaction.message);
    }).catch(e => { console.log(`event messageReactionAdd - validate error : ${e}`); });
    // add to database
    const discord_id = reaction.message.embeds[0].fields[0].value.replace(/[<@>]+/g, '');
    const localizor_name = reaction.message.embeds[0].fields[1].value.replace(/`/g, '');
    const override_name = reaction.message.embeds[0].fields[2].value.replace(/`/g, '');
    const add = await client.addRename(discord_id, localizor_name, override_name);
    // ? logfile
}

// [{"username":"BeB6c2a","prestige":255,"accountId":9770},{"username":"Ahmed","prestige":140,"accountId":9853}]

/**
 * refuse rename (ADMIN only)
 * @param {Discord.MessageReaction} reaction  added reaction
 */
function refuse(reaction) {
    const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
        .spliceFields(3, 1, { name: 'status', value: '`Refused`', inline: false });
    reaction.message.edit(newMsg).then(message => {
        // remove other reactions
        message.reactions.removeAll(reaction.message);
    }).catch(e => { console.log(`event messageReactionAdd - refuse error : ${e}`); });
    // ? logfile
}

/**
 * cancel rename (AUTHOR only)
 * @param {Discord.MessageReaction} reaction : added reaction
 */
function cancel(reaction) {
    const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
        .spliceFields(3, 1, { name: 'status', value: '`Cancelled`', inline: false });
    reaction.message.edit(newMsg).then(message => {
        // remove other reactions
        message.reactions.removeAll(reaction.message);
    }).catch(e => { console.log(`event messageReactionAdd - cancel error : ${e}`); });
    // ? logfile
}