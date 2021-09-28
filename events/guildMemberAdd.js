module.exports = {
    name: 'guildMemberAdd',
    /**
     * @param { Discord.client } client
     */
    execute(member) {
        member.guild.channels.get("789762485258813445").send(`Welcome <@${member.id}>, great to have you! Feel free to introduce yourself and check out #roles to get started.`);
    }
};
