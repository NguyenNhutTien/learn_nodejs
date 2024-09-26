const express = require("express");
const router = express.Router();
const { getHomePage, getSample, postCreateUsers, getCreateUsers, getEditUser, postEditUser, getDeleteUser, getDeleteUserConfirm } = require('../controllers/homeController')

router.get("/", getHomePage);

router.get("/sample", getSample);

router.get("/create-users", getCreateUsers);
router.post("/create-users", postCreateUsers);

router.get("/edit-user/:id", getEditUser);
router.post("/edit-user/:id", postEditUser);

router.get("/delete-user/:id", getDeleteUser);
router.get("/delete-user-confirm/:id", getDeleteUserConfirm);

module.exports = router