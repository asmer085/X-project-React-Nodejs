/* Ovaj kod predstavlja Express.js rute za korisničke operacije 
kao što su dohvaćanje informacija o korisniku, registracija, onboarding i prijava. 
 */

// Uvoz potrebnih modula
const express = require("express");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("./utilities/utils");
const { check, validationResult } = require("express-validator");
const { User, Team, UserTeam, Log } = require("../../db/models");
const { getUserToken, requireAuth } = require("./utilities/auth");

// Kreiranje Express.js rutera
const router = express.Router();

// Definicija validacija za korisnička polja
validateUserFields = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password"),
];

// Definicija validacija za ime tima
const validateTeamName = [
  check("teamName")
    .exists({ checkFalsy: true })
    .withMessage("You'll need to enter a name"),
];

// Definicija validacija za email i lozinku
const validateEmailPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password"),
];

// Ruta za dohvaćanje informacija o korisniku
router.get(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;
    const user = await User.findOne({
      where: {
        id: user_id,
      },
      attributes: ["name", "email", "roles"],
    });

    res.json(user);
  })
);

// Ruta za brisanje korisnika
router.delete(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const user_id = req.params.id;
    const u = await User.findByPk(user_id);
    // Create a new log entry
    const logMessage = `User ${u.name} has been deleted`;
    const log = await Log.create({ message: logMessage });
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
);

// Ruta za ažuriranje informacija o korisniku
router.put(
  "/user/:id",
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, password, roles } = req.body;

    // Provjeri postoji li korisnik
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ažuriraj informacije o korisniku
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashed_password = hashedPassword;
    }
    if (roles) user.roles = roles;

    try {
      await user.save();
      res.status(200).json({ message: "User information updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user information" });
    }
  })
);


// Ruta za dohvaćanje svih korisnika
router.get(
  "/users",
  asyncHandler(async (req, res, next) => {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "roles"],
    });
    res.json(users);
  })
);

// Ruta za registraciju
router.post(
  "/register",
  validateUserFields,
  asyncHandler(async (req, res) => {
    // Provjera validnosti unosa
    const validatorErr = validationResult(req);

    if (!validatorErr.isEmpty()) {
      const errors = validatorErr.array().map((error) => error.msg);
      res.status(422).json(["Errors", ...errors]);
      return;
    }

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Provjera da li korisnik već postoji
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      res.status(422).send({ Error: "User already exists" });
      return;
    }

    // Kreiranje novog korisnika
    const user = await User.create({
      name: name,
      email: email,
      hashed_password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create a new log entry
    const logMessage = `User ${name} has succesfully registered on the platform`;
    const log = await Log.create({ message: logMessage });

    const token = getUserToken(user);

    res.status(200).json({
      id: user.id,
      token,
      email: user.email,
      roles: user.roles,
    });
  })
);

// Ruta za onboarding
router.put(
  "/register/onboard",
  validateTeamName,
  asyncHandler(async (req, res, next) => {
    // Provjera validnosti unosa
    const validatorErr = validationResult(req);

    if (!validatorErr.isEmpty()) {
      const errors = validatorErr.array().map((error) => error.msg);
      res.json(["ERRORS", ...errors]);
      return;
    }

    const { email, teamName } = req.body;

    // Dohvaćanje korisnika
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const token = getUserToken(user);
    res.status(200).json({
      token,
    });

    // Kreiranje inicijalnog tima
    const team = await Team.create({
      name: teamName,
    });
    // Povezivanje korisnika sa timom
    const userTeam = await UserTeam.create({
      user_id: user.id,
      team_id: team.id,
    });
  })
);

// Ruta za prijavu
router.post(
  "/login",
  validateEmailPassword,
  asyncHandler(async (req, res, next) => {
    // Provjera validnosti unosa
    const validatorErr = validationResult(req);

    if (!validatorErr.isEmpty()) {
      const errors = validatorErr.array().map((error) => error.msg);
      res.json(["ERRORS", ...errors]);
      return;
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send({ error: "Must provide email and password" });
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login Failed");
      err.status = 401;
      err.title = "Login Failed";
      err.errors = ["The provided credentials were invalid"];
      res.status(401).json(err);
      return;
    } else {
      const token = getUserToken(user);


      // Create a new log entry
      const logMessage = `User ${email} has logged in`;
      const log = await Log.create({ message: logMessage });

      res.json({
        id: user.id,
        token,
        email: user.email,
        roles: user.roles,
      });
    }
  })
);

module.exports = router;

