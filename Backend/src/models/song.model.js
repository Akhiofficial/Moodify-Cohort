const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    posterUrl: {
        type: String,
    },
    title: {
        type: String,
        require: true
    },
    mood: {
        type: String,
        enum: {
            values: ["happy", "sad", "surprised"],
            message: "Enum this is"
        },
    }
})

const songModel = mongoose.model("songs", songSchema)


module.exports = songModel