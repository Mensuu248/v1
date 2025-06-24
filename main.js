const TelegramBot = require("node-telegram-bot-api");
const { exec } = require("child_process");

// Ganti ini dengan token bot kamu
const token = "ISI_TOKEN_BOT_KAMU";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "⏳ Sedang membuat akun CapCut otomatis...");

  exec("node index.js", async (error, stdout, stderr) => {
    if (error) {
      console.error(`Gagal: ${error.message}`);
      return bot.sendMessage(chatId, "❌ Gagal membuat akun.");
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    const result = stdout.trim();

    if (result) {
      bot.sendMessage(chatId, `✅ Akun berhasil dibuat:\n\n${result}`);
    } else {
      bot.sendMessage(chatId, "⚠️ Tidak ada output dari index.js.");
    }
  });
});
