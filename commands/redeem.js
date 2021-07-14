// imports
require('dotenv').config({ path: '../.env' });

module.exports = {
  name: 'redeem',
  description: 'redeem encrypted code',
  usage: '?redeem <code>',
  accessableby: 'Members',
  aliases: [],
  execute(message, args, client) {
    const user = message.author;
    // Too much arguments
    if (args.length > 1) return;
    // Redeemed code
    const code = args[0];
    // Decrypt code
    const decrypted = client.decrypt(code);
    // Convert decrypted code to JSON object
    const decrypted_json = JSON.parse(decrypted);
    // Assign according role
    switch (decrypted_json.role) { // TODO : add roles to user_id
      case 'role1':
        assign_role(user, 'role 1');
        break;
      case 'role2':
        assign_role(user, 'role 2');
        break;
      default:
        assign_role(user, 'role default');
        break;
    }
  }
};

function assign_role(user, role) {
  console.log(user.tag + ' was assigned: ' + role);
}
