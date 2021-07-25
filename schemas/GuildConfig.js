const mongoose = require('mongoose')

const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: false,
        unique: true
    },
    logId: {
        type: String,
        required: false,
        default: null
    },
    logDeletedMessages: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema)