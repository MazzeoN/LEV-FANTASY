"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var dotenv = require("dotenv");
dotenv.config();
var db_1 = require("./db");
var enviarDinamicaCommand_1 = require("./commands/enviarDinamicaCommand");
var borrarParticipante_1 = require("./commands/borrarParticipante");
var exportarParticipantes_1 = require("./commands/exportarParticipantes");
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    partials: [discord_js_1.Partials.Channel],
});
client.once("ready", function () {
    var _a;
    console.log("\uD83E\uDD16 Bot conectado como ".concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag));
});
// Slash commands
client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!interaction.isChatInputCommand())
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, , 10]);
                _a = interaction.commandName;
                switch (_a) {
                    case "enviar": return [3 /*break*/, 2];
                    case "exportar-participantes": return [3 /*break*/, 4];
                    case "borrar-participante": return [3 /*break*/, 6];
                }
                return [3 /*break*/, 8];
            case 2: return [4 /*yield*/, (0, enviarDinamicaCommand_1.enviarDinamicaCommand)(interaction)];
            case 3:
                _b.sent();
                return [3 /*break*/, 8];
            case 4: return [4 /*yield*/, (0, exportarParticipantes_1.exportarParticipantesCommand)(interaction)];
            case 5:
                _b.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, borrarParticipante_1.borrarParticipanteCommand)(interaction)];
            case 7:
                _b.sent();
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                console.error("\u274C Error ejecutando comando ".concat(interaction.commandName, ":"), error_1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
// Botón PARTICIPAR
client.on("interactionCreate", function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var guild, member_1, yaExiste, channelName, ticketChannel, preguntas, respuestas, _i, preguntas_1, pregunta, collected, respuesta, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isButton())
                    return [2 /*return*/];
                if (!(interaction.customId === "participar")) return [3 /*break*/, 15];
                guild = interaction.guild;
                member_1 = interaction.member;
                if (!guild || !member_1 || typeof member_1 === "string")
                    return [2 /*return*/];
                yaExiste = db_1.default
                    .prepare("SELECT 1 FROM participantes WHERE userId = ?")
                    .get(member_1.user.id);
                if (!yaExiste) return [3 /*break*/, 2];
                return [4 /*yield*/, interaction.reply({
                        content: "⚠️ Ya participaste del Fantasy. No podés enviar otro registro.",
                        ephemeral: true,
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                channelName = "ticket-".concat(member_1.user.id);
                return [4 /*yield*/, guild.channels.create({
                        name: channelName,
                        type: 0,
                        permissionOverwrites: [
                            { id: guild.id, deny: ["ViewChannel"] },
                            { id: member_1.user.id, allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"] },
                            { id: client.user.id, allow: ["ViewChannel", "SendMessages", "ManageChannels"] },
                        ],
                    })];
            case 3:
                ticketChannel = _a.sent();
                return [4 /*yield*/, interaction.reply({
                        content: "\u2705 Canal creado: ".concat(ticketChannel),
                        ephemeral: true,
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, ticketChannel.send("Hola <@".concat(member_1.user.id, ">! \uD83C\uDF89 Vamos a recolectar tus datos para el Fantasy de LEV. Por favor respond\u00E9 a las siguientes preguntas."))];
            case 5:
                _a.sent();
                preguntas = [
                    { campo: "nombreApellido", texto: "📛 ¿Cuál es tu **nombre y apellido**?" },
                    { campo: "pais", texto: "🌍 ¿De qué **país** sos?" },
                    { campo: "email", texto: "📧 ¿Cuál es tu **email**?" },
                    { campo: "nombreFantasy", texto: "🕹️ ¿Cuál es tu **nombre de cuenta en Fantasy**?" },
                    { campo: "screenshotUrl", texto: "📸 Por favor **subí una captura** del registro realizado." },
                ];
                respuestas = {};
                _i = 0, preguntas_1 = preguntas;
                _a.label = 6;
            case 6:
                if (!(_i < preguntas_1.length)) return [3 /*break*/, 13];
                pregunta = preguntas_1[_i];
                return [4 /*yield*/, ticketChannel.send(pregunta.texto)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                _a.trys.push([8, 10, , 12]);
                return [4 /*yield*/, ticketChannel.awaitMessages({
                        filter: function (m) { return m.author.id === member_1.user.id; },
                        max: 1,
                        time: 5 * 60000,
                        errors: ["time"],
                    })];
            case 9:
                collected = _a.sent();
                respuesta = collected.first();
                if (pregunta.campo === "screenshotUrl" && (respuesta === null || respuesta === void 0 ? void 0 : respuesta.attachments.size)) {
                    respuestas[pregunta.campo] = respuesta.attachments.first().url;
                }
                else {
                    respuestas[pregunta.campo] = (respuesta === null || respuesta === void 0 ? void 0 : respuesta.content) || "";
                }
                return [3 /*break*/, 12];
            case 10:
                err_1 = _a.sent();
                return [4 /*yield*/, ticketChannel.send("⏰ Se acabó el tiempo para responder. Cerrando canal...")];
            case 11:
                _a.sent();
                return [2 /*return*/, ticketChannel.delete()];
            case 12:
                _i++;
                return [3 /*break*/, 6];
            case 13:
                db_1.default.prepare("\n      INSERT INTO participantes (userId, nombreApellido, pais, email, nombreFantasy, screenshotUrl)\n      VALUES (?, ?, ?, ?, ?, ?)\n    ").run(member_1.user.id, respuestas.nombreApellido, respuestas.pais, respuestas.email, respuestas.nombreFantasy, respuestas.screenshotUrl);
                return [4 /*yield*/, ticketChannel.send("✅ ¡Gracias! Tus datos fueron enviados correctamente. Serán revisados por un admin para otorgar la confirmación.")];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15: return [2 /*return*/];
        }
    });
}); });
client.login(process.env.DISCORD_TOKEN);
