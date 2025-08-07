import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

export const enviarDinamicaCommandData = new SlashCommandBuilder()
  .setName("enviar")
  .setDescription("Envía el mensaje del Fantasy LEV");

export const enviarDinamicaCommand = async (interaction: ChatInputCommandInteraction) => {
  try {
    await interaction.deferReply({ ephemeral: true }); // <- ✅ Esto previene errores de interacción vencida

    const embedPrincipal = new EmbedBuilder()
      .setTitle("🏆 PARTICIPÁ DEL FANTASY DE EWC Y GANA PREMIOS")
      .setDescription(
        "¡Participá del Fantasy de EWC y ganá premios reales!\n\n" +
        "📌 **¿Cómo funciona?**\n" +
        "- Creás tu equipo de fantasía con jugadores reales\n" +
        "- Sumás puntos según su rendimiento\n" +
        "- Competís con otros participantes\n\n" +
        "🎁 ¡Hay una bolsa de **premios de 200.000 USD**!\n\n" +
        "🔥 Además, si te registrás con el QR y completás tus datos, participás por premios exclusivos de LEVIATAN:\n" +
        "1️⃣ Jersey oficial de LEV\n" +
        "2️⃣ Bundle de LEV en VALORANT\n" +
        "3️⃣ Gun Buddy de LEV en VALORANT"
      )
      .setColor(0x0099ff);

    const embedPasos = new EmbedBuilder()
      .setTitle("📲 ¿CÓMO PARTICIPAR?")
      .setDescription(
        "1️⃣ Escaneá el código QR\n" +
        "2️⃣ Completá tu registro en la web del Fantasy\n" +
        "3️⃣ Volvé al servidor y tocá **PARTICIPAR** para enviar tus datos\n\n" +
        "✅ ¡Con eso ya estás dentro del sorteo de LEV!"
      )
      .setImage("https://i.imgur.com/u9UlXqF.gif")
      .setColor(0x00b0f4);

    const button = new ButtonBuilder()
      .setCustomId("participar")
      .setLabel("🎟️ PARTICIPAR")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    // Enviamos el embed como mensaje nuevo en el canal (no como respuesta al slash)
    await interaction.channel?.send({
      embeds: [embedPrincipal, embedPasos],
      components: [row],
    });

    // Respondemos al comando diciendo que se envió correctamente
    await interaction.editReply({
      content: "✅ Dinámica enviada correctamente al canal.",
    });
  } catch (error) {
    console.error("❌ Error en enviarDinamicaCommand:", error);
    if (interaction.deferred) {
      await interaction.editReply({
        content: "❌ Hubo un error al intentar enviar la dinámica.",
      });
    }
  }
};
