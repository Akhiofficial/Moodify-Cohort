const songModel = require("../models/song.model")
const storageService = require("../services/storage.service")
const id3 = require("node-id3")

async function uploadSong(req, res) {
    try {
        // check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No song file provided. Ensure the form-data key is 'song'." });
        }

        // get song buffer and mood from request
        const songBuffer = req.file.buffer
        const { mood } = req.body

        // read song tags
        const tags = id3.read(songBuffer);

        // upload song and poster to imagekit
        const [songFile, posterFile] = await Promise.all([
            storageService.uploadFile({
                buffer: songBuffer,
                fileName: tags.title + ".mp3",
                folder: "/cohort-2/moodify/songs"
            }),
            storageService.uploadFile({
                buffer: tags.image.imageBuffer,
                fileName: tags.title + "-poster.jpeg",
                folder: "/cohort-2/moodify/posters"
            })
        ])

        // save song to database
        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood
        })

        // return response
        return res.status(201).json({
            message: "Song uploaded successfully",
            song
        })
    } catch (error) {
        // return error
        return res.status(500).json({ message: "Internal server error", error });
    }
}


async function getSong(req, res) {
    try {
        const { mood } = req.query

        const song = await songModel.findOne({ mood })

        return res.status(200).json({
            message: "Song fetched successfully",
            song
        })
    } catch (error) {
        return res.status(404).json({ message: "Song not found", error });
    }
}

module.exports = {
    uploadSong,
    getSong
}
