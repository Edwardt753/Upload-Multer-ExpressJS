const multer = require("multer");

// Correct usage: Call multer.memoryStorage() to create an instance of memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // limit 2 mb
});

module.exports = { upload };
