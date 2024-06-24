const express = require("express");
const router = express.Router();

const { getImage, getImagebyId } = require("../controller/get");
const { updateImage } = require("../controller/update");
const { upload } = require("../middleware/multer");
const { uploadMulter } = require("../controller/postmulter");

// router.get("/", getImage);
router.get("/images/:id", getImagebyId);
router.patch("/images/:id", updateImage);

router.post("/posting", upload.single("image"), uploadMulter);

module.exports = router;
