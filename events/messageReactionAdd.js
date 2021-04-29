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

        console.log(`${user} in #${reaction.message.channel.name} reacted with : ${reaction.emoji.name}`);
        reaction.message.guild.members.fetch(user.id).then(member => {
            if (!(user.id === reaction.message.author.id) && member.hasPermission('ADMINISTRATOR')) {
                console.log('admin reacted');
                if (reaction.emoji.name == '\u2705') {
                    validate();
                }
                if (reaction.emoji.name == '\u274c') {
                    refuse();
                }
            } else if (user.id === reaction.message.author.id && reaction.emoji.name == '🚫') {
                console.log('author reacted');
                cancel();
            } else {
                // not admin and not author
                console.log('non-authorized reacted');
            }
        });
    }
};

// TODO : execute rename
function validate() {
    //
    console.log('ok');
}
// TODO : something wrong
function refuse() {
    //
    console.log('not ok');
}

function cancel() {
    //
    console.log('cancel');
}