const GuildConfig = require('../schemas/GuildConfig')
module.exports = async (client, message) => {
    try {
        // const logs = message.guild.channels.cache.find(channel => channel.name === "chatlogs");
        var logId = null
        let channel = message.channel;
        let guilds = await GuildConfig.find()
        await guilds.forEach(guild => {
            if (guild.guildId != channel.guild.id) return
            if (guild.logDeletedMessages == false) return
            logId = guild.logId
        });
        let bool = await GuildConfig.findOne({
            guildId: message.channel.guild.id
        })
        if (bool.logDeletedMessages == false) return
        if (logId == null) return
        let logs = await message.guild.channels.cache.get(logId)
        // console.log(logs.id + " thefir")
        // console.log(logId + " theother")
        if (!logs) return
        // if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        //     message.guild.channels.create('chatlogs', {
        //         type: 'text'
        //     });
        // }
        // if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        //     console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
        // }
        const entry = await message.guild.fetchAuditLogs({
            type: 'MESSAGE_DELETE'
        }).then(audit => audit.entries.first())
        let user = ""
        // if (entry.extra.channel.id === message.channel.id &&
        //     (entry.target.id === message.author.id) &&
        //     (entry.createdTimestamp > (Date.now() - 5000)) &&
        //     (entry.extra.count >= 1)) {
        //     user = entry.executor.username
        // } else {
        //     user = message.author.username
        // }

        // console.log(message.content)
        // logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
        // logs.send(`message content is: ${message.content}`)
        // console.log(message.author)
        logs.send({
            // embed: {
            //     color: "#ffffff",
            //     // title: "**Message Deleted**",
            //     description: "**Message deleted**",
            //     fields: [{
            //             name: "Author",
            //             value: `<@${message.author.id}>`,
            //             inline: true
            //         },
            //         {
            //             name: "Channel",
            //             value: `<#${message.channel.id}>`,
            //             inline: true
            //         },
            //         {
            //             name: "Content",
            //             value: "```" + message.cleanContent + "```"
            //         }
            //     ],
            //     timestamp: new Date()
            // }
            embed: {
                author: {
                    name: message.author.tag,
                    icon_url: message.author.avatarURL()
                },
                color: "#ffffff",
                description: `**Message sent by <@${message.author.id}> deleted in <#${message.channel.id}>**\n\n${message.cleanContent}`,
                // fields: [{
                //     name: message.cleanContent
                // }],
                timestamp: new Date()
            }
        })
    } catch (err) {
        console.log(err)
    }
}