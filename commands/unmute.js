const Mute = require("../schemas/Mute")
exports.run = (client, message, args) => {
    try {
        //check if the author has the KICK_MEMBERS permission
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: "You do not have permission to mute users."
                }
            })
            return
        }
        const target = message.mentions.members.first();
        if (!target) {
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: "No target specified."
                }
            })
            return
        }
        const mutedRole = message.guild.roles.cache.find(
            (role) => role.name === 'Muted'
        );
        if (!mutedRole) {
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: "The muted role does not exist, please contact an administrator to create one and setup permissions."
                }
            })
            return
        }
        target.roles.remove(mutedRole).then(async () => {
            let mutes = await Mute.find()
            mutes.forEach((mute) => {
                if (mute.userId !== target.id) return
                mute.remove()
            })
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: `${target.user.tag} has been unmuted.`
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}