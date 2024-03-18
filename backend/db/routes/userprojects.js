const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { UserProject, Log } = require("../../db/models"); // Import the UserProject model

const router = express.Router();

// Delete UserProject instance
router.delete(
  "/user/:userId/project/:projectId",
  asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    // Attempt to delete the UserProject instance
    const deleted = await UserProject.destroy({
      where: {
        user_id: userId,
        project_id: projectId,
      },
    });
    const user = await User.findByPk(userId);
    const project = await Team.findByPk(projectId);
    // Create a new log entry
    const logMessage = `User ${user.name} has been kicked out of project ${project.name}`;
    const log = await Log.create({ message: logMessage });

    if (deleted) {
      res.status(200).json({ message: "UserProject instance deleted successfully" });
    } else {
      res.status(404).json({ message: "UserProject instance not found" });
    }
  })
);

module.exports = router;
