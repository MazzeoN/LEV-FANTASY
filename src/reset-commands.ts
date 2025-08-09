import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

import {
  enviarDinamicaCommandData,
} from "./enviarDinamicaCommand";
import {
  exportarParticipantesCommandData,
} from "./exportarParticipantes";
import {
  borrarParticipanteCommandData,
} from "./borrarParticipante";

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) {
  console.error("❌ Faltan variables de entorno requeridas (DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID).");
  process.exit(1);
}

const commands = [
  enviarDinamicaCommandData,
  exportarParticipantesCommandData,
  borrarParticipanteCommandData,
];

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

async function reset() {
  try {
    console.log("🧹 Borrando comandos anteriores...");
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: [] }
    );

    console.log("✅ Registrando nuevos comandos...");
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: commands }
    );

    console.log("🚀 Comandos actualizados correctamente.");
  } catch (err) {
    console.error("❌ Error al resetear comandos:", err);
  }
}

reset();
