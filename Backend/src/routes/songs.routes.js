const express = require("express")
const songController = require("../controllers/songs.controller")
const upload = require("../middlewears/upload.middlewear")

const router = express.Router()

/**
 * @route POST /api/songs
 * @desc Upload a new song
 */
router.post("/", upload.single("song"), songController.uploadSong)

/**
 * @route GET /api/songs
 * @desc Get a song by mood
 */
router.get("/", songController.getSong)




module.exports = router