const db = require("../models/index");
const adminModel = db.admin;
const path = require("path");

const uploadMulter = async (req, res) => {
  const name = req.file.filename;

  res.send({
    body: req.body,
    file: req.file,
  });
};

module.exports = { uploadMulter };
