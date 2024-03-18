/* Fajlovi u folderu migrations su vrlo bitni kada koristim Sequelize.
 Oni omogućavaju praćenje promjena na bazi podataka.
  Sa migracijama mogu prenijeti postojeću bazu podataka u drugo stanje i obrnuto.
   Te tranzicije stanja su sačuvane u fajlovima migracija, koji opisuju kako doći do novog stanja
    i kako vratiti promjene kako bi se vratili na staro stanje1.
Svaka migracija u Sequelize je JavaScript fajl koji izvozi dvije funkcije, up i down, 
koje određuju kako izvršiti migraciju i kako je poništiti1. 
Definišem te funkcije ručno, ali ih ne pozivate ručno; one će biti automatski pozvane od strane CLI 

u prvom fajlu za migracije usera sam opisao funkcije*/

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Teams" },
        onDelete: "CASCADE",
      },
      manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
