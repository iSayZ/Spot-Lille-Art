const express = require("express");

const router = express.Router();

const { addArtwork, addAvatar } = require("../../../controllers/uploadActions");

router.post("/", addArtwork);

router.post("/avatar", addAvatar);

module.exports = router;
