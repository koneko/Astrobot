const GuildConfig = require('../schemas/GuildConfig')
exports.run = async (client, message, args) => {
    let channel = message.channel
    let guilds = await GuildConfig.find()
    let gid = ""
    let logid = ""
    let logmsg = null
    await guilds.forEach(guild => {
        if (guild.guildId != channel.guild.id) return
        gid = guild.guildId
        logid = guild.logId
        logmsg = guild.logDeletedMessages
    });
    message.channel.send({
        embed: {
            color: "#ffffff",
            description: `[Commands](https://hub.koneko.link/Astrobot/commands) | [Support](https://discord.gg/gMjgraTgSd)\n\n**Configuration**\nGuild Id: ${gid}\nLog channel Id: ${logid}\nLogging deleted messages: ${logmsg}`,
        }
    })
}