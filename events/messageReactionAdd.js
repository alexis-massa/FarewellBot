const Discord = require('discord.js');
const { add, getAllValues } = require('../database');

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

/**
 * accept rename (ADMIN only)
 * @param {Discord.MessageReaction} reaction  : added reaction
 */
function validate(reaction) {
  console.log('ok');
  const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
    .spliceFields(3, 1, { name: 'status', value: '`Accepted`', inline: false });
  reaction.message.edit(newMsg).then(message => {
    // message.reactions.removeAll(reaction.message);

    add(reaction.message.embeds[0].fields[1].value, reaction.message.embeds[0].fields[2].value);

  }).catch(e => { console.log(`event messageReactionAdd - validate error : ${e}`); });
}

// [{"username":"BeB6c2a","prestige":255,"accountId":9770},{"username":"Ahmed","prestige":140,"accountId":9853}]

/**
 * refuse rename (ADMIN only)
 * @param {Discord.MessageReaction} reaction  : added reaction
 */
function refuse(reaction) {
  console.log('not ok');
  const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
    .spliceFields(3, 1, { name: 'status', value: '`Refused`', inline: false });
  reaction.message.edit(newMsg).then(message => {
    message.reactions.removeAll(reaction.message);
  }).catch(e => { console.log(`event messageReactionAdd - refuse error : ${e}`); });
}

/**
 * cancel rename (AUTHOR only)
 * @param {Discord.MessageReaction} reaction : added reaction
 */
function cancel(reaction) {
  console.log('cancel');
  const newMsg = new Discord.MessageEmbed(reaction.message.embeds[0])
    .spliceFields(3, 1, { name: 'status', value: '`Cancelled`', inline: false });
  reaction.message.edit(newMsg).then(message => {
    message.reactions.removeAll(reaction.message);
  }).catch(e => { console.log(`event messageReactionAdd - cancel error : ${e}`); });
}