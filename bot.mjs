import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import fetch from 'node-fetch';

config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Fungsi untuk mendapatkan kutipan motivasi dari ZenQuotes API
async function getMotivationalQuote() {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    return `${data[0].q} - ${data[0].a}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Stay positive and keep pushing forward!';
  }
}

// Ketika bot menerima pesan /start
bot.start((ctx) => ctx.reply('Welcome! Send /motivate to get a motivational quote.'));

// Ketika bot menerima pesan /motivate
bot.command('motivate', async (ctx) => {
  const quote = await getMotivationalQuote();
  ctx.reply(quote);
});

// Mulai bot
bot.launch().then(() => {
  console.log('Bot is running...');
});
