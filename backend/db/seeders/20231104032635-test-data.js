//slican princip migracija

"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@email.com",
          hashed_password: bcrypt.hashSync("sifra"),
          name: "Demo Korisnik",
          roles: "Worker",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "asmerkarabeg1@gmail.com",
          hashed_password: bcrypt.hashSync("sifra"),
          name: "Admin User",
          roles: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "korisnik1@email.com",
          hashed_password: bcrypt.hashSync("sifra"),
          name: "korisnik1",
          roles: "Worker",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "korisnik2@email.com",
          hashed_password: bcrypt.hashSync("sifra"),
          name: "korisnik2",
          roles: "Worker",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "korisnik3@email.com",
          hashed_password: bcrypt.hashSync("sifra"),
          name: "korisnik3",
          roles: "Worker",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const teams = await queryInterface.bulkInsert(
      "Teams",
      [
        {
          name: "PMF",
          description: "Ovo je fakultetski tim",
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },
        {
          name: "ETF",
          description: "PROBNI TIM",
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },
        {
          name: "testTim",
          description: "opis tima",
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 5,
        },
      ],
      { returning: true }
    );
    const userteams = await queryInterface.bulkInsert(
      "UserTeams",
      [
        {
          user_id: 1,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const projects = await queryInterface.bulkInsert(
      "Projects",
      [
        {
          name: "Projekat baza",
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },
        {
          name: "Next.js Mobilna Aplikacija",
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },

        {
          name: "Node projekat",
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },
        {
          name: "UI/UX Projekat",
          team_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },

        {
          name: "Projekat1",
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },
        {
          name: "Projekat2",
          team_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 1,
        },

        {
          name: "Projekat3",
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 5,
        },
        {
          name: "Testiranje aplikacija",
          team_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          manager_id: 5,
        },
      ],
      { returning: true }
    );

    const userProject = await queryInterface.bulkInsert(
      "UserProjects",
      [
        {
          user_id: 1,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          project_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          project_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          project_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 4,
          project_id: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          project_id: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 5,
          project_id: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const tasklists = await queryInterface.bulkInsert(
      "TaskLists",
      [
        {
          name: "To Do",
          project_id: 1,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 1,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 1,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 6,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 6,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 6,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 8,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 8,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 8,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "To Do",
          project_id: 7,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "In Progress",
          project_id: 7,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Completed",
          project_id: 7,
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const tasks = await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          name: "lorem",
          tasklist_id: 1,
          project_id: 1,
          assignee_id: 1,
          description: "lorem",
          due_date: new Date("2024-01-13"),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create Models",
          tasklist_id: 1,
          project_id: 1,
          assignee_id: 1,
          description: "create models",
          due_date: "2024-01-13",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Update new product feature",
          tasklist_id: 1,
          project_id: 1,
          assignee_id: 3,
          description: "Update client's request",
          due_date: "2024-01-13",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Test Functionality",
          tasklist_id: 2,
          project_id: 1,
          assignee_id: 1,
          description: "Test functionality of feature",
          due_date: "2024-01-13",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Product Feature XY",
          tasklist_id: 3,
          project_id: 1,
          assignee_id: 1,
          description: "Test functionality of feature",
          due_date: "2024-01-13",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          tasklist_id: 3,
          project_id: 1,
          assignee_id: 1,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          due_date: "2024-01-13",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Create Pamphlet",
          tasklist_id: 4,
          project_id: 6,
          assignee_id: 1,
          description: "create marketing pamphlets",
          due_date: "2024-01-23",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Discuss marketing strategy",
          tasklist_id: 4,
          project_id: 6,
          assignee_id: 1,
          description: "discuss marketing strategy",
          due_date: "2024-01-23",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meet with client",
          tasklist_id: 10,
          project_id: 7,
          assignee_id: 1,
          description: "Meet with client",
          due_date: "2024-01-23",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Discuss business requirements with client",
          tasklist_id: 11,
          project_id: 7,
          assignee_id: 1,
          description: "Business requirements",
          due_date: "2024-01-13",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meet with stakeholders",
          tasklist_id: 11,
          project_id: 7,
          assignee_id: 1,
          description: "Stakeholder meeting at location Y",
          due_date: "2024-01-13",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const logs = await queryInterface.bulkInsert(
      "Logs",
      [
        {
          message: "Demo Korisnik created a new project: Projekat baza",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Admin User created a new project: Next.js Mobilna Aplikacija",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Admin User created a new project: Node projekat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Admin User created a new project: UI/UX Projekat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Admin User created a new project: Projekat1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );

    const comments = await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "Poradit ću na ovome",
          task_id: 1,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Rok ističe",
          task_id: 1,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Teams", null, {});
    await queryInterface.bulkDelete("UserTeams", null, {});
    await queryInterface.bulkDelete("Projects", null, {});
    await queryInterface.bulkDelete("UserProjects", null, {});
    await queryInterface.bulkDelete("TaskLists", null, {});
    await queryInterface.bulkDelete("Tasks", null, {});
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
