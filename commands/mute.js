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
        let time = args[1]
        if (!time) {
            time = "1000w"
        }
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

        target.roles.add(mutedRole).catch((err) => {
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: "There was an issue, please DM an administrator"
                }
            })
            console.log(err)
            return
        });
        let whenToUnmute = new Date();
        if (time.endsWith('s')) {
            let newtime = parseInt(time.replace('s', ''));
            whenToUnmute.setSeconds(whenToUnmute.getSeconds() + newtime);
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: `<@${target.id}> has been muted for ${newtime} seconds.`
                }
            });
        } else if (time.endsWith('m')) {
            let newtime = parseInt(time.replace('m', ''));
            whenToUnmute.setMinutes(whenToUnmute.getMinutes() + newtime);
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: `<@${target.id}> has been muted for ${newtime} minutes.`
                }
            });
        } else if (time.endsWith('h')) {
            let newtime = parseInt(time.replace('h', ''));
            whenToUnmute.setHours(whenToUnmute.getHours() + newtime);
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: `<@${target.id}> has been muted for ${newtime} hours.`
                }
            });
        } else if (time.endsWith('d')) {
            let newtime = parseInt(time.replace('d', ''));
            whenToUnmute.setDate(whenToUnmute.getDate() + newtime);
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: `<@${target.id}> has been muted for ${newtime} days.`
                }
            });
        } else if (time.endsWith('w')) {
            let newtime = parseInt(time.replace('w', ''));
            whenToUnmute.setDate(whenToUnmute.getDate() + newtime * 7);
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: `<@${target.id}> has been muted for ${newtime} weeks.`
                }
            });
        }
        Mute.create({
            userId: target.id,
            moderatorId: message.author.id,
            guildId: message.guild.id,
            mutedRoleId: mutedRole.id,
            whenToUnmute: whenToUnmute.toISOString(),
        })
    } catch (err) {
        console.log(err)
    }
}