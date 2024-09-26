const connection = require("../config/database");
const { get } = require("../routes/web");
const { getAllUsers, getUserById, updateUser } = require("../services/CRUDService");
const User = require("../models/user");

const getHomePage = async (req, res) => {
  let results = await User.find({});
  return res.render("home", { listUsers: results});
};

const getSample = (req, res) => {
  res.render("sample");
};

const getCreateUsers = (req, res) => {
  res.render('create-users.ejs')
}

const postCreateUsers = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;

  // const [results, fields] = await connection.query(
  //   'INSERT INTO Users (email, name, city) VALUES (?,?,?)',
  //   [email, name, city]
  // );

  await User.create({
    email: email,
    name: name,
    city: city
  });
  res.send('create user success')
}

const getEditUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user)
  if (!user) {
    return res.render('404');
  }
  res.render('edit-user', { user: user })
}

const postEditUser = async (req, res) => { 
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.render('404');
  }
  await User.findByIdAndUpdate(req.params.id, {
    email: req.body.email,
    name: req.body.name,
    city: req.body.city
  });
  res.redirect('/')
}

const getDeleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('delete-user-confirm', { user: user })
}

const getDeleteUserConfirm = async (req, res) => {
  // const [results, fields] = await connection.query(
  //   'DELETE FROM Users WHERE id = ?',
  //   [req.params.id]
  // );
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/')
}

module.exports = {
  getHomePage,
  getSample,
  postCreateUsers,
  getCreateUsers,
  getEditUser,
  postEditUser,
  getDeleteUser,
  getDeleteUserConfirm
};
