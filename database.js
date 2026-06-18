const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("refood.db", (err) => {

    if (err) {

        console.log(err.message);

    } else {

        console.log("Base de datos conectada");

    }

});

// Tabla usuarios
db.run(`
CREATE TABLE IF NOT EXISTS usuarios (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL

)
`);

// Tabla pedidos
db.run(`
CREATE TABLE IF NOT EXISTS pedidos (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    producto TEXT,
    cantidad INTEGER,
    total REAL,
    estado TEXT

)
`);

module.exports = db;