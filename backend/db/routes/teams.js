const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { Team, UserTeam, User, Project, UserProject, Log } = require("../../db/models");

const router = express.Router();
//Authenticates user before being able to use API
// router.use(requireAuth);

//Gets all Teams
router.get(
  "/teams",
  asyncHandler(async (req, res, next) => {
    const teams = await Team.findAll({});

    res.json(teams);
  })
);

//get all users in a Team
router.get(
  "/team/:id/users",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.id;

    const users = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      where: { id: team_id },
    });

    res.json(users);
  })
);

// router.get(
//   "/:id/users",
//   asyncHandler(async (req, res, next) => {
//     // const project_id = req.params.id;
//     const team_id = req.params.id;

//     const users = await User.findAll({
//       include: [{ model: Team, where: { id: team_id } }],
//       attributes: ["id", "name"],
//     });
//     res.json(users);
//   })
// );

//get all teams for a user
router.get(
  "/team/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;

    const teams = await Team.findAll({
      include: [
        {
          model: User,
          where: {
            id: user_id,
          },
          attributes: ["name", "id"],
        },
      ],
    });

    res.json(teams);
  })
);

//get all projects for team
router.get(
  "/team/:id/projects",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.id;
    const projects = await Project.findAll({
      where: {
        team_id: team_id,
      },
    });
    res.json(projects);
  })
);

//get everything about team
router.get(
  "/team/:id",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.id;
    const team = await Team.findOne({
      include: [
        { model: Project },
        { model: User, attributes: ["name", "email", "id"] },
      ],
      where: { id: team_id },
    });
    if (!team) {
      res.send({ error: "No team exists" });
    }
    res.json(team);
  })
);

//Create team
router.post(
  "/team/user/:userId",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.userId;
    const user = await User.findByPk(user_id);
    // Create a new log entry
    const logMessage = `User ${user.name} has created a new team`;
    const log = await Log.create({ message: logMessage });
    const { description, name } = req.body;
    if (description) {
      const team = await Team.create({
        description: description,
        name: name,
        manager_id: user_id,
      });
      //Adds user to team
      const userteam = await UserTeam.create({
        team_id: team.id,
        user_id: user_id,
      });
      res.json(team).status(201);
    } else if (!description) {
      const team = await Team.create({
        name: name,
      });
      //Adds user to team
      const userteam = await UserTeam.create({
        team_id: team.id,
        user_id: user_id,
      });
      res.json(team).status(201);
    }
  })
);

//Add other users to team
router.post(
  "/team/:teamId/user/:userId",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.teamId;
    const user_id = req.params.userId;
    const userteam = await UserTeam.findOne({
      where: {
        team_id: team_id,
        user_id: user_id,
      },
    });
    if (userteam) {
      res.status(404).send({ error: "user already exists" });
    } else if (!userteam) {
      const newUserTeam = await UserTeam.create({
        team_id: team_id,
        user_id: user_id,
      });

    const user = await User.findByPk(user_id);
    const team = await Team.findByPk(team_id);
    // Create a new log entry
    const logMessage = `User ${user.name} has become a new member of team ${team.name}`;
    const log = await Log.create({ message: logMessage });
      res.json(newUserTeam).status(201);
    }
  })
);

//Edit team description
router.put(
  "/:teamId/description",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.teamId;
    const { description } = req.body;
    await Team.update(
      {
        description: description,
      },
      {
        where: {
          id: team_id,
        },
      }
    );
  })
);

//Create Project for team
router.post(
  "/team/:id/project",
  asyncHandler(async (req, res, next) => {
    //need to add owner for project
    const team_id = req.params.id;
    const { name, userId } = req.body;

    const user = await User.findByPk(userId);
    const team = await Team.findByPk(team_id);
    // Create a new log entry
    const logMessage = `User ${user.name} has created a new project for team ${team.name}`;
    const log = await Log.create({ message: logMessage });

    const project = await Project.create({
      name: name,
      team_id: team_id,
      manager_id: userId,
    });

    if (project) {
      const userproject = await UserProject.create({
        user_id: userId,
        project_id: project.id,
      });
      res.json(userproject).status(201);
    } else {
      res.status(404);
    }
  })
);

//Delete team
router.delete(
  "/team/:teamId/",
  asyncHandler(async (req, res, next) => {
    const team_id = req.params.teamId;
    const teamm = await Team.findByPk(team_id);
    // Create a new log entry
    const logMessage = `Team ${teamm.name} has been deleted`;
    const log = await Log.create({ message: logMessage });
    const project_id = req.params.projectId;
    const team = await Team.destroy({
      where: { id: team_id },
    });
    res.status(202);
  })
);

module.exports = router;
