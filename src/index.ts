import { Client, GatewayIntentBits, Partials, Interaction } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

import db from "./db";
import { enviarDinamicaCommand } from "./commands/enviarDinamicaCommand";
import { borrarParticipanteCommand } from "./commands/borrarParticipante";
import { exportarParticipantesCommand } from "./commands/exportarParticipantes";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once("ready", () => {
  console.log(`🤖 Bot conectado como ${client.user?.tag}`);
});

// Slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case "enviar":
        await enviarDinamicaCommand(interaction);
        break;
      case "exportar-participantes":
        await exportarParticipantesCommand(interaction);
        break;
      case "borrar-participante":
        await borrarParticipanteCommand(interaction);
        break;
    }
  } catch (error) {
    console.error(`❌ Error ejecutando comando ${interaction.commandName}:`, error);
  }
});

// Botón PARTICIPAR
client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "participar") {
    const guild = interaction.guild;
    const member = interaction.member;

    if (!guild || !member || typeof member === "string") return;

    const yaExiste = db
      .prepare("SELECT 1 FROM participantes WHERE userId = ?")
      .get(member.user.id);

    if (yaExiste) {
      await interaction.reply({
        content: "⚠️ Ya participaste del Fantasy. No podés enviar otro registro.",
        ephemeral: true,
      });
      return;
    }

    const channelName = `ticket-${member.user.id}`;

    const ticketChannel = await guild.channels.create({
      name: channelName,
      type: 0,
      permissionOverwrites: [
        { id: guild.id, deny: ["ViewChannel"] },
        { id: member.user.id, allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"] },
        { id: client.user!.id, allow: ["ViewChannel", "SendMessages", "ManageChannels"] },
      ],
    });

    await interaction.reply({
      content: `✅ Canal creado: ${ticketChannel}`,
      ephemeral: true,
    });

    await ticketChannel.send(`Hola <@${member.user.id}>! 🎉 Vamos a recolectar tus datos para el Fantasy de LEV. Por favor respondé a las siguientes preguntas.`);

    const preguntas = [
      { campo: "nombreApellido", texto: "📛 ¿Cuál es tu **nombre y apellido**?" },
      { campo: "pais", texto: "🌍 ¿De qué **país** sos?" },
      { campo: "email", texto: "📧 ¿Cuál es tu **email**?" },
      { campo: "nombreFantasy", texto: "🕹️ ¿Cuál es tu **nombre de cuenta en Fantasy**?" },
      { campo: "screenshotUrl", texto: "📸 Por favor **subí una captura** del registro realizado." },
    ];

    const respuestas: Record<string, string> = {};

    for (const pregunta of preguntas) {
      await ticketChannel.send(pregunta.texto);

      try {
        const collected = await ticketChannel.awaitMessages({
          filter: m => m.author.id === member.user.id,
          max: 1,
          time: 5 * 60_000,
          errors: ["time"],
        });

        const respuesta = collected.first();

        if (pregunta.campo === "screenshotUrl" && respuesta?.attachments.size) {
          respuestas[pregunta.campo] = respuesta.attachments.first()!.url;
        } else {
          respuestas[pregunta.campo] = respuesta?.content || "";
        }
      } catch (err) {
        await ticketChannel.send("⏰ Se acabó el tiempo para responder. Cerrando canal...");
        return ticketChannel.delete();
      }
    }

    db.prepare(`
      INSERT INTO participantes (userId, nombreApellido, pais, email, nombreFantasy, screenshotUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      member.user.id,
      respuestas.nombreApellido,
      respuestas.pais,
      respuestas.email,
      respuestas.nombreFantasy,
      respuestas.screenshotUrl
    );

    await ticketChannel.send("✅ ¡Gracias! Tus datos fueron enviados correctamente. Serán revisados por un admin para otorgar la confirmación.");
  }
});

client.login(process.env.DISCORD_TOKEN);
