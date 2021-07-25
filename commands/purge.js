exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send({
        embed: {
            color: "#ffffff",
            description: "Please specify amount."
        }
    })
    if (isNaN(+args[0])) return
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
        embed: {
            color: "#ffffff",
            description: "You do not have the manage messages permission."
        }
    })
    await message.delete()
    message.channel.bulkDelete(parseInt(args[0]))
    let purgemsg = message.channel.send({
        embed: {
            color: "#ffffff",
            description: `Purged ${args[0]} messages!`
        }
    }).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 3000)
    })
}