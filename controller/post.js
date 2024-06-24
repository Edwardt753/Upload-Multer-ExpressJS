const db = require("../models/index");
const adminModel = db.admin;
const path = require("path");

const postImage = async (req, res) => {
  //Validation image in form
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });

  //retrive request input
  const name = req.body.title;
  const file = req.files.file;

  //check file size for validation later
  const fileSize = file.data.length;

  //get extension
  const ext = path.extname(file.name);

  //naming file(opsional can be change)with hashing
  const fileName = file.md5 + ext;

  //create url
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  //array for validation
  const allowedType = [".png", ".jpg", ".jpeg"];

  //use method include to chec array
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  //move to directory
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await adminModel.create({
        name: name,
        image: fileName,
        url: url,
      });
      res.status(201).json({
        name: name,
        filesize: fileSize,
        ext: ext,
        fileName: fileName,
        url: url,
        msg: "Product Created Successfuly",
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

module.exports = { postImage };
