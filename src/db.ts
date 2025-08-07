import * as path from "path";
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "..", "database.db"), {
  verbose: console.log, // opcional para debug
  fileMustExist: true,
});

db.pragma("journal_mode = WAL"); // ✅ Permite acceso concurrente

db.prepare(`
  CREATE TABLE IF NOT EXISTS participantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    nombreApellido TEXT,
    pais TEXT,
    email TEXT,
    nombreFantasy TEXT,
    screenshotUrl TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export default db;
