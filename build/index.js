"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.BOT_TOKEN);
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || '');
bot.command('oldschool', (ctx) => ctx.reply('Hello'));
bot.command('hipster', telegraf_1.Telegraf.reply('λ'));
bot.launch();
