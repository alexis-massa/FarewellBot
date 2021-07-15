// imports
require('dotenv').config({ path: '../.env' });

// Hard coded roles
const events = [
  // {
  //   event_name: 'WISPS_COLLECTED_ALPHA',
  //   role: {
  //     role_name: 'Wisp Collector: Alpha',
  //     role_id: '864466853112053780'
  //   }
  // },
  {
    event_name: 'WISPS_COLLECTED_ALPHA',
    role: { role_name: 'OUI', role_id: '806165583817211955' }
  }
];

module.exports = {
  name: 'redeem',
  description: 'redeem encrypted code',
  usage: '?redeem <code>',
  accessableby: 'Members',
  aliases: [],
  execute: async (message, args, client) => {
    /**
     * event {"event":"GAME_EVENT","time":1234567}
     * event - role {"event":"GAME_EVENT", role: {role_name: "Wisp Collector: Alpha", role_id: "864466853112053780"}}
     * role - role_id
     */

    // GuildMember (message sender in server)
    const member = message.member;
    // Too much arguments
    if (args.length > 1) return; // TODO : add warning message
    // Redeemed code
    const code = args[0];
    // Check if code is already redeemed
    const redeemed = await client.isRedeemed(code.toString());
    if (redeemed) {
      console.log('redeemed');
      // Code already redeemed
      message.channel.send(
        ":/ Looks like your code has already been redeemed, if you don't have any new role, please contact <@200538376321892352> or <@374626097226317824>"
      );
    } else {
      // Decrypt code
      const json_data = client.decrypt(code);
      const role = find_role(json_data.event);
      if (role !== false) {
        // member.roles.add(role);
        assign_role(member, role);
        // save code
      } else {
        // role not found
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
 */
function assign_role(member, role) {
  console.log();
  // check if user has role
  if (!member.roles.cache.some((r) => r.name === role.role_name)) {
    console.log(
      member.id + ' assigned: ' + role.role_name + ' - ' + role.role_id
    );
    member.roles.add(role.role_id);
  }
}
