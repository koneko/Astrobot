require('dotenv').config()

const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require('mongoose')
const client = new Discord.Client();

const GuildConfig = require('./schemas/GuildConfig')
const Mute = require('./schemas/Mute')

const config = {}
config.prefix = "?"
config.ownerID = process.env.ownerID
config.token = process.env.TOKEN
client.config = config;

mongoose.connect('mongodb://localhost/astrobotdb', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => console.log('Connected to MongoDB'))

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log('Loaded command ' + commandName)
        client.commands.set(commandName, props);
    });
});


setInterval(async () => {
    const guildMutes = await Mute.find()
    guildMutes.forEach(async mute => {
        //fetch guild by id
        let guild = await client.guilds.fetch(mute.guildId);
        let role = await guild.roles.fetch(mute.mutedRoleId);
        let whenToUnute = new Date(mute.whenToUnmute);
        let now = new Date();
        //console.log(`Checking ${role.name} from ${guild.name}: ${whenToUnute.toISOString()} (${now.toISOString()})`);
        if (whenToUnute < now) {
            const member = await guild.members.fetch(mute.userId)
            if (member) {
                member.roles.remove(role);
                await mute.remove()
            }
        }
    });
}, 1000)


client.login(config.token);