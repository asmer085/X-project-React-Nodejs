const express = require("express");
const { asyncHandler } = require("./utilities/utils");
const { requireAuth } = require("./utilities/auth");
const { check, validationResult } = require("express-validator");
const { TaskList, Task, Log } = require("../../db/models");
const router = express.Router();

//Authenticates user before being able to use API
// router.use(requireAuth);

//get all tasklists
router.get(
  "/tasklists",
  asyncHandler(async (req, res, next) => {
    const tasklists = await TaskList.findAll({});

    res.json(tasklists);
  })
);

//get all tasks for tasklist
router.get(
  "/tasklist/:id/tasks",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const tasks = await Task.findAll({
      where: {
        tasklist_id: tasklist_id,
      },
    });
    res.json(tasks);
  })
);

//Create task to tasklist
router.post(
  "/tasklist/:id/task",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const {
      name,
      projectId,
      assigneeId,
      due_date,
      completed,
      description,
    } = req.body;
    if (completed === []) {
      completed = false;
    }
    const task = await Task.create({
      name: name,
      project_id: projectId,
      assignee_id: assigneeId,
      due_date: due_date,
      completed: completed,
      description: description,
      tasklist_id: tasklist_id,
    });
    const user = await User.findByPk(assigneeId);
    const project = await Project.findByPk(projectId);
    // Create a new log entry
    const logMessage = `User ${user.name} has created a new taks for project ${project.name}`;
    const log = await Log.create({ message: logMessage });
    if (!task) {
      res.status(404);
    } else {
      res.json(task).status(201);
    }
  })
);

//Delete TaskList
router.delete(
  "/tasklist/:id",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;

    const tasklist = await TaskList.destroy({
      where: { id: tasklist_id },
    });
    res.json(202);
  })
);

//Edit Column index
router.put(
  "/tasklist/:id/columnindex",
  asyncHandler(async (req, res, next) => {
    const { newIndex } = req.body;
    const tasklist_id = req.params.id;
    const column_index = req.params.columnIndex;

    try {
      const updateIndex = await TaskList.update(
        {
          column_index: newIndex,
        },
        {
          where: {
            id: tasklist_id,
          },
        }
      );
      console.log(newIndex);
      res.json(updateIndex);
    } catch (err) {
      res.status(401).send({ error: "Something went wrong" });
    }
  })
);

//update tasklist name

router.put(
  "/tasklist/:id/title",
  asyncHandler(async (req, res, next) => {
    const tasklist_id = req.params.id;
    const { columnTitle } = req.body;
    const tasklist = await TaskList.update(
      { name: columnTitle },
      { where: { id: tasklist_id } }
    );
    res.json({ message: "updated" });
  })
);

module.exports = router;
