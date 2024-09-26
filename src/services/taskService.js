const Task = require("../models/task");
const apiQueryParams = require("api-query-params");

const createTask = async (data) => {
  switch (data.type) {
    case "EMTPY-TASK":
      return await Task.create(data);
    // case "ADD-USERS":
    //   var project = await Project.findById(data.projectId);
    //   for (let i = 0; i < data.usersInfor.length; i++) {
    //     project.usersInfor.push(data.usersInfor[i]);
    //   }
    //   return await project.save();
    // case "DELETE-USERS":
    //   var project = await Project.findById(dataxn.projectId);
    //   for (let i = 0; i < data.usersInfor.length; i++) {
    //     project.usersInfor.pull(data.usersInfor[i]);
    //   }
    //   return await project.save();
    default:
      throw new Error("Invalid project type");
  }
};

const getTask = async (query) => {
  const { filter, limit } = apiQueryParams(query);
  delete filter.page;
  const page = query.page ? parseInt(query.page) : 1;
  const offset = (page - 1) * limit;
  const rs = await Task.find(filter).skip(offset).limit(limit).exec();
  return rs;
};

const updateTask = async (id, updateData) => {
  return await Task.findByIdAndUpdate(id, { ...updateData });
};

const deleteTask = async (id) => {
  return await Task.deleteById(id);
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
