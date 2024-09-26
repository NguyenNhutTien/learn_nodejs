const Customer = require("../models/customer");

const createCustomer = async (customer) => {
  return await Customer.create(customer);
};

const createBulkCustomer = async (customers) => {
  return await Customer.insertMany(customers);
};

const getCustomer = async (query) => {
  console.log("query", query);
  page = query.page ? parseInt(query.page) : 1;
  limit = query.limit ? parseInt(query.limit) : 10000;
  offset = (page - 1) * limit;

  const filterFields = ["name", "address", "phone", "email", "description"];
  const andArr = [];
  for (const key in query) {
    if (filterFields.includes(key)) {
      if (query[key] instanceof Array) {
        orArr = [];
        for (const idx in query[key]) {
          orArr.push({ [key]: { $regex: ".*" + query[key][idx] + ".*" } });
        }
        andArr.push({ $or: orArr });
      } else {
        andArr.push({ [key]: { $regex: ".*" + query[key] + ".*" } });
      }
    }
  }
  filter = { $and: andArr };
  console.log("filter", JSON.stringify(filter));
  return await Customer.find(filter).skip(offset).limit(limit).exec();
};

const updateCustomer = async (id, updateData) => {
  return await Customer.findByIdAndUpdate(id, updateData);
};

const deleteCustomer = async (id) => {
  return await Customer.deleteById(id);
};

const deleteBulkCustomer = async (ids) => {
  return await Customer.deleteMulti(ids);
};

module.exports = {
  createCustomer,
  createBulkCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  deleteBulkCustomer,
};
