const Project = require("../models/project");
const apiQueryParams = require("api-query-params");

const createProject = async (data) => {
  switch (data.type) {
    case "EMTPY-PROJECT":
      return await Project.create(data);
    case "ADD-USERS":
      var project = await Project.findById(data.projectId);
      for (let i = 0; i < data.usersInfor.length; i++) {
        project.usersInfor.push(data.usersInfor[i]);
      }
      return await project.save();
    case "DELETE-USERS":
      var project = await Project.findById(data.projectId);
      for (let i = 0; i < data.usersInfor.length; i++) {
        project.usersInfor.pull(data.usersInfor[i]);
      }
      return await project.save();
    case "ADD-TASKS":
      var project = await Project.findById(data.projectId);
      for (let i = 0; i < data.tasks.length; i++) {
        project.tasks.push(data.tasks[i]);
      }
      return await project.save();
    default:
      throw new Error("Invalid project type");
  }
};

const getProject = async (query) => {
  const { filter, limit, population } = apiQueryParams(query);
  delete filter.page;
  const page = query.page ? parseInt(query.page) : 1;
  const offset = (page - 1) * limit;
  const rs = await Project.find(filter)
    .skip(offset)
    .limit(limit)
    .populate(population)
    .exec();
  return rs;
};

const updateProject = async (id, updateData) => {
  return await Project.findByIdAndUpdate(id, updateData);
};

const deleteProject = async (id) => {
  return await Project.deleteById(id);
};

module.exports = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
};
