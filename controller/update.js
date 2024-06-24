const db = require("../models/index");
const adminModel = db.admin;
const path = require("path");
const fs = require("fs");

const updateImage = async (req, res) => {
  const id = req.params.id; // Corrected to access id from route parameters
  const checkData = await adminModel.findOne({
    where: {
      id: id,
    },
  });
  if (!checkData) {
    return res.status(404).json({
      message: "No data found",
    });
  }
  let fileName = "";
  if (req.files === null) {
    fileName = adminModel.image;
  } else {
    const file = req.files.file;

    //check file size for validation later
    const fileSize = file.data.length;

    //get extension
    const ext = path.extname(file.name);

    //naming file(opsional can be change)with hashing
    fileName = file.md5 + ext;

    //for validation
    const allowedType = [".png", ".jpg", ".jpeg"];

    //VALIDATION, use method include to chec array
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${checkData.image}`;
    fs.unlinkSync(filepath);

    //move to directory
    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.name;
  //create url
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await adminModel.update(
      {
        name: name,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      name: name,
      fileName: fileName,
      url: url,
      message: "Product updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { updateImage };
