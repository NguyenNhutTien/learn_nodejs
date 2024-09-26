const { uploadSingleFile } = require("../services/fileService");
const customerService = require("../services/customerService");
const Joi = require("joi");

module.exports = {
  postCustomerAPI: async (req, res) => {
    let params = ({ name, address, phone, email, description } = req.body);

    // validate
    const schema = Joi.object({
      name: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      description: Joi.string(),
    });

    const { error } = schema.validate(params, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errorCode: 1,
        message: error.details.map((e) => e.message),
      });
    }
    
    // upload image
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let image = await uploadSingleFile(req.files.image);

    params.image = image;

    let rs = await customerService.createCustomer(params);

    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  postBulkCustomerAPI: async (req, res) => {
    let rs = await customerService.createBulkCustomer(req.body.customers);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  getCustomerAPI: async (req, res) => {
    let results = await customerService.getCustomer(req.query);
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  },
  putCustomerAPI: async (req, res) => {
    let id = req.params.id;
    let updateData = ({ name, address, phone, email, description } = req.body);
    let results = await customerService.updateCustomer(id, updateData);
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  },
  deleteCustomerAPI: async (req, res) => {
    result = await customerService.deleteCustomer(req.params.id);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },
  deleteBulkCustomersAPI: async (req, res) => {
    result = await customerService.deleteBulkCustomer(req.body.ids.split(","));
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },
};
