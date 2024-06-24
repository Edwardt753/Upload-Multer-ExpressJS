const db = require("../models/index");
const adminModel = db.admin;

const getImage = async (req, res) => {
  try {
    const response = await adminModel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const getImagebyId = async (req, res) => {
  try {
    const response = await adminModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getImage, getImagebyId };
