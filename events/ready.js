module.exports = {
  name: 'ready',
  once: true,
  /**
   * @param { Discord.client } client
   */
  execute(client) {
    client.user.setStatus('available');
    client.user.setPresence({
      status: 'online',
      activity: {
        type: 'LISTENING',
        name: '?chesley help'
      }
    });
    console.log(`${client.user.tag} is online !`);
  }
};