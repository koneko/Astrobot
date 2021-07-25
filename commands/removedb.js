const GuildConfig = require('../schemas/GuildConfig')
exports.run = async (client, message, args) => {
    if (message.author.id !== process.env.ownerID) return message.channel.send('You do not have permission to use this command!')
    let channel = message.channel
    let guilds = await GuildConfig.find()
    await guilds.forEach(guild => {
        if (guild.guildId != channel.guild.id) return
        guild.remove()
    });
    message.channel.send({
        embed: {
            color: "#ffffff",
            description: "DB entry removed."
        }
    })
}