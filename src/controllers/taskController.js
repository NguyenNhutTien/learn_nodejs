const taskService = require("../services/taskService");

module.exports = {
  postTaskAPI: async (req, res) => {
    rs = await taskService.createTask(req.body);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  getTaskAPI: async (req, res) => {
    rs = await taskService.getTask(req.query);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  putTaskAPI: async (req, res) => {
    let id = req.params.id;
    const rs = await taskService.updateTask(id, req.body);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  },
  deleteTaskAPI: async (req, res) => {
    const rs = await taskService.deleteTask(req.params.id);
    return res.status(200).json({
      errorCode: 0,
      data: rs,
    });
  }
};
