module.exports = {
  name: 'guildMemberAdd',
  /**
   * @param { Discord.client } client
   */
  execute(member, client) {

    client.channels.fetch("789762485053685761").then(channel => {
      channel.send(`Welcome <@${member.id}>, great to have you! Feel free to introduce yourself ${client.channels.cache.get('789762484776337436').toString()}  and then check out ${client.channels.cache.get('838393771259461652').toString()} to get started.`);
    });
  }
};
