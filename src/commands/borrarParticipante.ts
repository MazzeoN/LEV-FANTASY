import { SlashCommandBuilder, ChatInputCommandInteraction, GuildTextBasedChannel } from "discord.js";
import db from "../db";

export const borrarParticipanteCommandData = new SlashCommandBuilder()
  .setName("borrar-participante")
  .setDescription("Elimina un participante por su ID de usuario")
  .addStringOption(option =>
    option
      .setName("userid")
      .setDescription("El ID del usuario que querés eliminar")
      .setRequired(true)
  );

export async function borrarParticipanteCommand(interaction: ChatInputCommandInteraction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const userId = interaction.options.getString("userid", true);
    console.log(`🧪 Buscando por userId: ${userId}`);

    const participante = db
      .prepare("SELECT * FROM participantes WHERE userId = ?")
      .get(userId);

    if (!participante) {
      return await interaction.editReply({
        content: "⚠️ Ese usuario no está registrado como participante.",
      });
    }

    const result = db
      .prepare("DELETE FROM participantes WHERE userId = ?")
      .run(userId);

    console.log(`DELETE FROM participantes WHERE userId = '${userId}'`);
    console.log("📦 Resultado DB:", result);

    // 🔍 Intentar eliminar canal asociado
    const guild = interaction.guild;
    if (guild) {
      const ticketChannel = guild.channels.cache.find(channel =>
        channel.name === `ticket-${participante.nombreFantasy?.toLowerCase().replace(/\s+/g, "-")}`
      );

      if (ticketChannel?.isTextBased()) {
        await (ticketChannel as GuildTextBasedChannel).delete("Eliminado junto con el participante");
        console.log("🗑️ Canal eliminado:", ticketChannel.name);
      }
    }

    return await interaction.editReply({
      content: `🗑️ Participante eliminado correctamente: \`${userId}\``,
    });
  } catch (error) {
    console.error("❌ Error ejecutando comando:", error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({
        content: "❌ Ocurrió un error al procesar el comando.",
      });
    }
  }
}
