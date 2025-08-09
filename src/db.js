"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var Database = require("better-sqlite3");
var db = new Database(path.join(__dirname, "..", "database.db"), {
    verbose: console.log, // opcional para debug
    fileMustExist: true,
});
db.pragma("journal_mode = WAL"); // ✅ Permite acceso concurrente
db.prepare("\n  CREATE TABLE IF NOT EXISTS participantes (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    userId TEXT,\n    nombreApellido TEXT,\n    pais TEXT,\n    email TEXT,\n    nombreFantasy TEXT,\n    screenshotUrl TEXT,\n    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP\n  )\n").run();
exports.default = db;
