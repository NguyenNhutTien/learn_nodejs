const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const {
  getUsersAPI,
  postUsersAPI,
  putUsersAPI,
  deleteUsersAPI,
  uploadFileAPI,
  uploadMultiFileAPI,
} = require("../controllers/apiController");
const {
  postCustomerAPI,
  postBulkCustomerAPI,
  getCustomerAPI,
  putCustomerAPI,
  deleteCustomerAPI,
  deleteBulkCustomersAPI,
} = require("../controllers/customerController.js");

const {
  postProjectAPI,
  getProjectAPI,
  putProjectAPI,
  deleteProjectAPI,
} = require("../controllers/projectController.js");

const {
  postTaskAPI,
  getTaskAPI,
  putTaskAPI,
  deleteTaskAPI
} = require("../controllers/taskController.js");

router.get("/users", getUsersAPI);
router.post("/users", postUsersAPI);
router.put("/users", putUsersAPI);
router.delete("/users/:id", deleteUsersAPI);
router.post("/upload-file", uploadFileAPI);
router.post("/upload-multi-file", uploadMultiFileAPI);

router.post("/customers", postCustomerAPI);
router.post("/customers-bulk", postBulkCustomerAPI);
router.get("/customers", getCustomerAPI);
router.put("/customers/:id", putCustomerAPI);
router.delete("/customers/:id", deleteCustomerAPI);
router.delete("/bulk-customers", upload.none(), deleteBulkCustomersAPI);

router.get("/info/:name/:address", (req, res) => {
  res.status(200).json({
    errorCode: 0,
    queryString: req.query,
    params: req.params,
  });
});

router.post("/projects", postProjectAPI);
router.get("/projects", getProjectAPI);
router.put("/projects/:id", putProjectAPI);
router.delete("/projects/:id", deleteProjectAPI);

router.post("/tasks", postTaskAPI);
router.get("/tasks", getTaskAPI);
router.put("/tasks/:id", putTaskAPI);
router.delete("/tasks/:id", deleteTaskAPI);

module.exports = router;
