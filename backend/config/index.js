module.exports = {
  environment: "development", // Okruženje u kojem se aplikacija trenutno izvršava
  port: 5432 , // Port na kojem će se pokrenuti server
  db: { // Konfiguracija za bazu podataka
    username: 'postgres', // Korisničko ime za pristup bazi podataka
    password: '123321', // Lozinka za pristup bazi podataka
    database: 'projectapp', // Ime baze podataka
    host: 'localhost', // Host na kojem se nalazi baza podataka
  },
  jwtConfig: { // Konfiguracija za JWT (JSON Web Token)
    secret: 'e2942ea722fb58e0518b45ab83eb4887b5da8d1f0e038c110d056727bbb42b25', // Tajni ključ koji se koristi za potpisivanje tokena
    expiresIn: '1h', // Vrijeme isteka tokena
  },
};
