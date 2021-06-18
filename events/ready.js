module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    client.user.setActivity('*Bark* *Bark*');
		console.log(`${client.user.tag} is online !`);
	}
};