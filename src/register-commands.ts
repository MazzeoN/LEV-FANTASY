import { REST, Routes, SlashCommandBuilder } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

import { borrarParticipanteCommandData } from "./commands/borrarParticipante";
import { testearIdCommandData } from "./commands/testearId";

// IDs
const CLIENT_ID = "1403029433324933214";
const GUILD_ID = "1399167008905498808";

const commands = [
  new SlashCommandBuilder()
    .setName("enviar")
    .setDescription("Envía el mensaje del Fantasy LEV"),

  new SlashCommandBuilder()
    .setName("exportar-participantes")
    .setDescription("Exporta todos los participantes como Excel (solo admins)"),

  borrarParticipanteCommandData,
  testearIdCommandData
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log("🔄 Registrando comandos en el servidor...");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log("✅ Comandos registrados en el servidor");
  } catch (error) {
    console.error("❌ Error registrando comandos:", error);
  }
})();
