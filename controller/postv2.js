const db = require("../models/index");
const adminModel = db.admin;
const path = require("path");

const uploadImage = async (req, res) => {
  const name = req.body.title;
  const image = req.file.path;
  try {
    await adminModel.create({
      name: name,
      image: image,
      url: image,
    });
    res.status(201).json({
      name: name,
      fileName: image,
      url: url,
      msg: "Product Created Successfuly",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { uploadImage };
