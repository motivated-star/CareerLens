const express = require("express");
const router = express.Router();
const multer = require("multer");
const { upload } = require("../controllers/upload");

const storage = multer.memoryStorage(); // or diskStorage if saving locally
const uploadR= multer({ storage });

router.post("/upload", uploadR.single("resume"), upload);

module.exports = router;