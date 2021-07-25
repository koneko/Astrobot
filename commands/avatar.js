exports.run = (client, message, args) => {
    const msg = message
    if (!args[0]) {
        msg.channel.send({
            embed: {
                color: "#ffffff",
                "image": {
                    "url": msg.author.avatarURL()
                }
            }
        })
    } else {
        let user = msg.guild.members.cache.get(args[0])
        if (!user) return msg.channel.send({
            embed: {
                color: "#ffffff",
                description: "No user found, please use the id, not ping. (?id @<user>)"
            }
        })
        msg.channel.send({
            embed: {
                color: "#ffffff",
                "image": {
                    "url": user.user.avatarURL()
                }
            }
        })
    }
}