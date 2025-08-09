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
exports.enviarDinamicaCommand = exports.enviarDinamicaCommandData = void 0;
var discord_js_1 = require("discord.js");
exports.enviarDinamicaCommandData = new discord_js_1.SlashCommandBuilder()
    .setName("enviar")
    .setDescription("Envía el mensaje del Fantasy LEV");
var enviarDinamicaCommand = function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var embedPrincipal, embedPasos, button, row, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 7]);
                return [4 /*yield*/, interaction.deferReply({ ephemeral: true })];
            case 1:
                _b.sent(); // <- ✅ Esto previene errores de interacción vencida
                embedPrincipal = new discord_js_1.EmbedBuilder()
                    .setTitle("🏆 PARTICIPÁ DEL FANTASY DE EWC Y GANA PREMIOS")
                    .setDescription("¡Participá del Fantasy de EWC y ganá premios reales!\n\n" +
                    "📌 **¿Cómo funciona?**\n" +
                    "- Creás tu equipo de fantasía con jugadores reales\n" +
                    "- Sumás puntos según su rendimiento\n" +
                    "- Competís con otros participantes\n\n" +
                    "🎁 ¡Hay una bolsa de **premios de 200.000 USD**!\n\n" +
                    "🔥 Además, si te registrás con el QR y completás tus datos, participás por premios exclusivos de LEVIATAN:\n" +
                    "1️⃣ Jersey oficial de LEV\n" +
                    "2️⃣ Bundle de LEV en VALORANT\n" +
                    "3️⃣ Gun Buddy de LEV en VALORANT")
                    .setColor(0x0099ff);
                embedPasos = new discord_js_1.EmbedBuilder()
                    .setTitle("📲 ¿CÓMO PARTICIPAR?")
                    .setDescription("1️⃣ Escaneá el código QR\n" +
                    "2️⃣ Completá tu registro en la web del Fantasy\n" +
                    "3️⃣ Volvé al servidor y tocá **PARTICIPAR** para enviar tus datos\n\n" +
                    "✅ ¡Con eso ya estás dentro del sorteo de LEV!")
                    .setImage("https://i.imgur.com/u9UlXqF.gif")
                    .setColor(0x00b0f4);
                button = new discord_js_1.ButtonBuilder()
                    .setCustomId("participar")
                    .setLabel("🎟️ PARTICIPAR")
                    .setStyle(discord_js_1.ButtonStyle.Primary);
                row = new discord_js_1.ActionRowBuilder().addComponents(button);
                // Enviamos el embed como mensaje nuevo en el canal (no como respuesta al slash)
                return [4 /*yield*/, ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
                        embeds: [embedPrincipal, embedPasos],
                        components: [row],
                    }))];
            case 2:
                // Enviamos el embed como mensaje nuevo en el canal (no como respuesta al slash)
                _b.sent();
                // Respondemos al comando diciendo que se envió correctamente
                return [4 /*yield*/, interaction.editReply({
                        content: "✅ Dinámica enviada correctamente al canal.",
                    })];
            case 3:
                // Respondemos al comando diciendo que se envió correctamente
                _b.sent();
                return [3 /*break*/, 7];
            case 4:
                error_1 = _b.sent();
                console.error("❌ Error en enviarDinamicaCommand:", error_1);
                if (!interaction.deferred) return [3 /*break*/, 6];
                return [4 /*yield*/, interaction.editReply({
                        content: "❌ Hubo un error al intentar enviar la dinámica.",
                    })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.enviarDinamicaCommand = enviarDinamicaCommand;
