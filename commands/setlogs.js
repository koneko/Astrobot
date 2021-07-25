const GuildConfig = require('../schemas/GuildConfig')
exports.run = async (client, message, args) => {
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
        guild.logId = channel.id
        guild.save()
    });
    message.channel.send({
        embed: {
            color: "#ffffff",
            description: "Logging channel set to <#" + channel.id + ">"
        }
    })
}