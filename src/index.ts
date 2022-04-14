import { Telegraf } from 'telegraf'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()
process.env.NTBA_FIX_350 = '1'
const bot = new Telegraf(process.env.BOT_TOKEN || '')
bot.command('start', (ctx: any) => ctx.reply(`Hola ${ctx.chat.first_name}`))
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('hipster', Telegraf.reply('λ'))
bot.command('chart', (ctx) => {

    const width = 400; //px
    const height = 400; //px
    const backgroundColour = 'white'; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
    const labels = ['January', 'February', 'March', 'April', 'May', 'June',];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Cuentas',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };
    const config: any = {
        type: 'bar',
        data: data,
        options: {}
        // See https://www.chartjs.org/docs/latest/configuration
    };
    chartJSNodeCanvas.renderToBuffer(config)
        .then(image => {
            ctx.replyWithPhoto({ source: image })
        })
        .catch(err => {
            ctx.reply('Error al renderizar el gráfico')
        });
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
