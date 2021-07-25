exports.run = (client, message, args) => {
    const user = message.mentions.members.first()
    if (!user) return message.channel.send({
        embed: {
            color: "#ffffff",
            description: "Please mention a user to get their ID."
        }
    })
    message.channel.send({
        embed: {
            color: "#ffffff",
            description: user.user.username + "'s id is: `" + user.user.id + '`'
        }
    })
}