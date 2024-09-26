const projectService = require("../services/projectService");

module.exports = {
  postProjectAPI: async (req, res) => {
    rs = await projectService.createProject(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  getProjectAPI: async (req, res) => {
    rs = await projectService.getProject(req.query);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  putProjectAPI: async (req, res) => {
    let id = req.params.id;
    let updateData = ({ name, startDate, endDate, description } = req.body);
    const rs = await projectService.updateProject(id, updateData);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  deleteProjectAPI: async (req, res) => {
    const rs = await projectService.deleteProject(req.params.id);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  }
};
