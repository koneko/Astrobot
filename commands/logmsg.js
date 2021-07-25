const GuildConfig = require('../schemas/GuildConfig')
exports.run = async (client, message, args) => {
    try {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send({
            embed: {
                color: "#ffffff",
                description: "You do not have admin privilages."
            }
        })
        let channel = message.channel
        let guilds = await GuildConfig.find()
        await guilds.forEach(guild => {
            if (guild.guildId != channel.guild.id) return
            guild.logDeletedMessages = !guild.logDeletedMessages
            guild.save()
            message.channel.send({
                embed: {
                    color: "#ffffff",
                    description: "Logging deleted messages has been set to " + guild.logDeletedMessages
                }
            })
        });

    } catch (err) {
        console.log(err)
    }
}