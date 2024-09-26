const User = require("../models/user");
const { uploadSingleFile, uploadMultiFile } = require("../services/fileService");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postUsersAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUsersAPI = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  let user = await User.findByIdAndUpdate(id, {
    email: email,
    name: name,
    city: city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const deleteUsersAPI = async (req, res) => {
  result = await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};

const uploadFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  try {
    await uploadSingleFile(req.files.image);
    return res.status(200).json({
      errorCode: 0,
      message: "Upload file successfully",
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: 0,
      message: "Upload file failed",
      error: error.message,
    });
  }
};

const uploadMultiFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  try {
    await uploadMultiFile(req.files.image);
    return res.status(200).json({
      errorCode: 0,
      message: "Upload file successfully",
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: 0,
      message: "Upload file failed",
      error: error.message,
    });
  }
};

module.exports = {
  getUsersAPI,
  postUsersAPI,
  putUsersAPI,
  deleteUsersAPI,
  uploadFileAPI,
  uploadMultiFileAPI
};
