const GuildConfig = require('../schemas/GuildConfig')
module.exports = async (client, guild) => {
    try {
        console.log(guild.id)
        await GuildConfig.create({
            guildId: guild.id
        })
        console.log('Joined a new guild and logged to DB.')
    } catch (e) {
        console.log(e)
    }
}