// imports
require('dotenv').config({ path: '../.env' });

module.exports = {
  name: 'redeem',
  description: 'redeem encrypted code',
  usage: '?redeem <code>',
  accessableby: 'Members',
  aliases: [],
  execute(message, args, client) {
    /**
     * event {"event":"GAME_EVENT","time":1234567}
     * event - role {"event":"GAME_EVENT", role: {role_name: "Wisp Collector: Alpha", role_id: "864466853112053780"}}
     * role - role_id
     */

    // Hard coded roles
    const events = [
      // {
      //   event_name: 'TEST_WISP_THING',
      //   role: {
      //     role_name: 'Wisp Collector: Alpha',
      //     role_id: '864466853112053780'
      //   }
      // },
      {
        event_name: 'WISP_COLLECTOR_ALPHA',
        role: {
          role_name: 'OUI',
          role_id: '806165583817211955'
        }
      }
    ];

    // GuildMember (message sender in server)
    const member = message.member;
    // Too much arguments
    if (args.length > 1) return;
    // Redeemed code
    const code = args[0];
    test(code, member, events, client);
    // // Decrypt code
    // const decrypted = client.decrypt(code);
    // // Convert decrypted code to JSON object
    // const decrypted_json = JSON.parse(decrypted);
    // console.log(decrypted_json);
    // // check_role(member, decrypted_json);
  }
};

function test(code, member, events, client) {

  // console.log(member.id);
  // console.log(events);
  // console.log(code);

  client.decrypt(code);

}

// function check_role(member, role, events) {
  // // verify user roles
  // if (member.roles.cache.some(role.name === 'OUI')) {
  //   console.log('oui');
  // } else {
  //   console.log('non');
  // }
  // // Assign according role
  // switch (role) {
  //   case 'role1':
  //     assign_role(member, 'role 1');
  //     break;
  //   case 'role2':
  //     assign_role(member, 'role 2');
  //     break;
  //   default:
  //     assign_role(member, 'role default');
  //     break;
  // }
// }

// function assign_role(member, role) {
//   console.log(member.id + ' was assigned: ' + role);
// }
