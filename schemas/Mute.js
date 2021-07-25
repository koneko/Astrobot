const mongoose = require('mongoose')

const MuteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    moderatorId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    mutedRoleId: {
        type: String,
        required: true,
    },
    whenToUnmute: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mute', MuteSchema)