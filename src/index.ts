import { Telegraf } from 'telegraf'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
process.env.NTBA_FIX_350 = '1'
const bot = new Telegraf(process.env.BOT_TOKEN || '')
bot.command('start', (ctx: any) => ctx.reply(`Hola ${ctx.chat.first_name}`))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('λ'))
bot.command('chart', async (ctx) => {
    const img = await fs.readFileSync("chart.txt", "utf8")
    const fileOpts:any = {
        filename: 'image',
        contentType: 'image/jpg',
    };
    ctx.replyWithPhoto(img)
    bot.telegram.sendPhoto(ctx.chat.id, String(Buffer.from(img.substr(17), 'base64')), fileOpts)
    // bot.sendPhoto(chatId, Buffer.from(file.substr(17), 'base64'), fileOpts);
})
try {
    (async () => {
        await bot.launch()
        console.log('Bot iniciado')
    })();
}
catch {
    console.log('Bot no iniciado')
}
// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
