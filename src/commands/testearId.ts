import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import db from "../db";

export const testearIdCommand = async (interaction: ChatInputCommandInteraction) => {
  const userId = interaction.options.getString("userid");

  if (!userId) {
    await interaction.reply({ content: "❌ Debés ingresar un `userid`.", ephemeral: true });
    return;
  }

  const encontrado = db.prepare("SELECT * FROM participantes WHERE userId = ?").get(userId);

  if (encontrado) {
    await interaction.reply({ content: "✅ Usuario **existe** en la base.", ephemeral: true });
  } else {
    await interaction.reply({ content: "❌ Usuario **NO está** en la base.", ephemeral: true });
  }
};

export const testearIdCommandData = new SlashCommandBuilder()
  .setName("testear-id")
  .setDescription("Verifica si un userId está en la base")
  .addStringOption(option =>
    option.setName("userid")
      .setDescription("ID del usuario")
      .setRequired(true)
  );
