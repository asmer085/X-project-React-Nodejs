// dio koda koristi prethodno definisanu konfiguraciju
const config = require("./index"); // Uvoz konfiguracije

const db = config.db; // Izvlačenje konfiguracije baze podataka
const username = db.username; // Izvlačenje korisničkog imena
const password = db.password; // Izvlačenje lozinke
const database = db.database; // Izvlačenje imena baze podataka
const host = db.host; // Izvlačenje hosta

// Izvoz konfiguracije za Sequelize, ORM za rad sa SQL bazama podataka
module.exports = {
  development: { // Konfiguracija za razvojno okruženje
    username,
    password,
    database,
    host,
    dialect: "postgres", // Dijalekt SQL-a koji se koristi
    dialectOptions: {
      credentials: "require", // Zahtijeva kredencijale za pristup bazi podataka
    },
  },
  production: { // Konfiguracija za produkcijsko okruženje
    dialect: "postgres",
    dialectOptions: {
      credentials: "require",
    },
    use_env_variable: "DATABASE_URL", // Koristi varijablu okruženja za URL baze podataka
  },
};
