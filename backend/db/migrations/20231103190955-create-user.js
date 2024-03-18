/* Fajlovi u folderu migrations su vrlo bitni kada koristim Sequelize.
 Oni omogućavaju praćenje promjena na bazi podataka.
  Sa migracijama mogu prenijeti postojeću bazu podataka u drugo stanje i obrnuto.
   Te tranzicije stanja su sačuvane u fajlovima migracija, koji opisuju kako doći do novog stanja
    i kako vratiti promjene kako bi se vratili na staro stanje1.
Svaka migracija u Sequelize je JavaScript fajl koji izvozi dvije funkcije, up i down, 
koje određuju kako izvršiti migraciju i kako je poništiti1. 
Definišem te funkcije ručno, ali ih ne pozivate ručno; one će biti automatski pozvane od strane CLI */

"use strict";
module.exports = {
  // 'up' funkcija se koristi za izvršavanje migracije.
  // Ova funkcija će biti pozvana kada pokrenete migracije.
  up: async (queryInterface, Sequelize) => {
    // Ovdje kreiram tabelu 'Users' sa određenim kolonama.
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      hashed_password: {
        allowNull: false,
        type: Sequelize.STRING.BINARY,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      image: {
        type: Sequelize.STRING,
      },
      roles: {
        type: Sequelize.STRING,
        defaultValue: "Worker",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // 'down' funkcija se koristi za poništavanje migracije.
  // Ova funkcija će biti pozvana kada treba ponistiti migraciju.
  down: async (queryInterface, Sequelize) => {
    // Ovdje se brise tabela 'Users'.
    await queryInterface.dropTable("Users");
  },
};
