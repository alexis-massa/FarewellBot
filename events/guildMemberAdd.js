module.exports = {
  name: 'guildMemberAdd',
  /**
   * @param { Discord.client } client
   */
  execute(member, client) {

    client.channels.fetch("942170593296519180").then(channel => {
      channel.send(`Welcome <@${member.id}>! Feel free to introduce yourself, check ${client.channels.cache.get('789762484776337436').toString()} for the server rules and overview, and then head to ${client.channels.cache.get('838393771259461652').toString()} to get started.`);
    });
  }
};
