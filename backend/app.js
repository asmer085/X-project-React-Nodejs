// Uvoz potrebnih modula
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { environment } = require("./config");
const cors = require("cors");

// Uvoz ruta
const userRouter = require("./db/routes/users");
const taskRouter = require("./db/routes/tasks");
const projectRouter = require("./db/routes/projects");
const teamRouter = require("./db/routes/teams");
const tasklistRouter = require("./db/routes/tasklists");
const commentRouter = require("./db/routes/comments");
const userteamRouter = require("./db/routes/userteams");
const workHourRouter = require("./db/routes/workhours");
const logRouter = require("./db/routes/logs");


// Kreiranje Express.js aplikacije
const app = express();

// Korištenje body-parser middleware-a za parsiranje JSON tijela zahtjeva
app.use(bodyParser.json());

// Korištenje morgan middleware-a za logiranje zahtjeva
app.use(morgan("dev"));

// Postavljanje CORS opcija
const corsOptions = {
  origin: true,
  credentials: true,
};

// Korištenje CORS middleware-a sa postavljenim opcijama
app.use(cors(corsOptions));
app.options('localhost:8000', cors(corsOptions));

// Korištenje ruta
app.use(userRouter);
app.use(taskRouter);
app.use(projectRouter);
app.use(teamRouter);
app.use(tasklistRouter);
app.use(commentRouter);
app.use(userteamRouter);
app.use(workHourRouter);
app.use(logRouter);

// Middleware za hvatanje neobrađenih zahtjeva
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Opšti middleware za obradu grešaka
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

// Pokretanje servera na portu 8000
app.listen(8000, () => console.log(`Listening on port ${8000}...`));
