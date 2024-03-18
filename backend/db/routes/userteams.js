const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { UserTeam, Team, User, Log } = require("../../db/models");

const router = express.Router();

//Leave Team

router.delete(
  "/:teamId/user/:userId",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.teamId;
    const user_id = req.params.userId;
    const userteam = await UserTeam.destroy({
      where: {
        user_id: user_id,
        team_id: team_id,
      },
    });

    const user = await User.findByPk(user_id);
    const teamm = await Team.findByPk(team_id);
    // Create a new log entry
    const logMessage = `User ${user.name} has been kicked out of team ${teamm.name}`;
    const log = await Log.create({ message: logMessage });

    const team = await Team.findOne({
      where: {
        id: team_id,
      },
      include: [{ model: User }],
    });


    if (team.Users.length === 0) {
      await Team.destroy({
        where: {
          id: team_id,
        },
      });
    }
    res.send({ message: "User removed from Team" });
  })
);

//get all userteams
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const userteams = await UserTeam.findAll({});
    res.json(userteams);
  })
);

module.exports = router;
