// imports
require('dotenv').config({ path: '../.env' });

// Hard coded roles
const events = [
  {
    event_name: 'WISPS_COLLECTED_ALPHA',
    role: {
      role_name: 'Wisp Collector: Alpha',
      role_id: '864466853112053780'
    }
  }
];

module.exports = {
  name: 'redeem',
  description: 'Chesley will redeem your secret code and give you the reward you deserve',
  accessableby: 'Members',
  aliases: ['r'],
  execute: async (message, args, client) => {
    /**
     * event {"event":"GAME_EVENT","time":1234567}
     * event - role {"event":"GAME_EVENT", role: {role_name: "Wisp Collector: Alpha", role_id: "864466853112053780"}}
     * role - role_id
     */

    // GuildMember (message sender in server)
    const member = message.member;
    // Too much arguments
    if (args.length > 1) {
      message.channel.send(
        'There\'s an issue with the code you entered, make sure there are no spaces in the code and if it still doesn\'t work, contact <@200538376321892352> or <@374626097226317824>'
      );
      return;
    }
    // Redeemed code
    const code = args[0];
    // Check if code is already redeemed
    const redeemed = await client.isRedeemed(code.toString());
    if (redeemed) {
      // Code already redeemed
      message.channel.send(
        'Looks like your code has already been redeemed. if you didn\'t try an old code, please contact <@200538376321892352> or <@374626097226317824>'
      );
    } else {
      // Decrypt code
      const json_data = client.decrypt(code);
      const role = find_role(json_data.event);
      if (role !== false) {
        // member.roles.add(role);
        if (client.redeem(code)) {
          if (assign_role(member, role)) {
            client.channels.cache.get('864465180473819136').send(
              `:tada: <@${member.id}> just earned the \`${role.role_name}\` role! Congrats!`
            );
          }
        }
      } else {
        // role not found
        message.channel.send(
        'There\'s an issue with the code you entered, make sure there are no spaces in the code and if it still doesn\'t work, contact <@200538376321892352> or <@374626097226317824>'
      );
      }
    }
  }
};

/**
 * Checks if role exists
 * @param {JSON} event : event name
 * @returns role JSON data or false if doesn't exist
 */
function find_role(event) {
  let val = false;
  events.forEach((e) => {
    if (e.event_name === event) val = e.role;
  });
  return val;
}

/**
 * Checks if member doesn't already have role and assign it
 * @param {*} member
 * @param {*} role_name
 * @return boolean
 */
function assign_role(member, role) {
  // check if user has role
  if (!member.roles.cache.some((r) => r.name === role.role_name)) {
    member.roles.add(role.role_id);
    return true;
  }
  return false;
}
