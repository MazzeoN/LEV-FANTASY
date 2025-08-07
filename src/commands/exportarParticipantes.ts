import { ChatInputCommandInteraction, AttachmentBuilder } from "discord.js";
import db from "../db";
import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { SlashCommandBuilder } from "discord.js";

// Este es el builder del comando que le faltaba
export const exportarParticipantesCommandData = new SlashCommandBuilder()
  .setName("exportar-participantes")
  .setDescription("Exporta todos los participantes como Excel (solo admins)");

export const exportarParticipantesCommand = async (interaction: ChatInputCommandInteraction) => {
  // Solo admins
  if (!interaction.memberPermissions?.has("Administrator")) {
    await interaction.reply({ content: "🚫 Solo administradores pueden usar este comando.", ephemeral: true });
    return;
  }

  // Obtener participantes
  const participantes = db.prepare(`SELECT * FROM participantes ORDER BY timestamp DESC`).all();

  if (participantes.length === 0) {
    await interaction.reply({ content: "❌ No hay participantes registrados.", ephemeral: true });
    return;
  }

  // Crear hoja de Excel
  const worksheet = XLSX.utils.json_to_sheet(participantes);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Participantes");

  // Guardar temporalmente el archivo
  const exportPath = path.join(__dirname, "../../participantes.xlsx");
  XLSX.writeFile(workbook, exportPath);

  // Crear adjunto
  const attachment = new AttachmentBuilder(exportPath);

  await interaction.reply({
    content: `✅ Archivo exportado con ${participantes.length} participantes.`,
    files: [attachment],
    ephemeral: true,
  });

  // Opcional: borrar archivo temporal después
  setTimeout(() => fs.unlinkSync(exportPath), 10_000);
};
