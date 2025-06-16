import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bot = new TelegramBot('7484144935:AAHQQkZOPjls0iIAyLLDgyfq1FzK2l60Ql4', { polling: true });

let currentChatId = null;

// Обробка команди /start з кнопкою WebApp
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;

  const webAppUrl = 'https://7ec8-37-57-114-33.ngrok-free.app'; // Твій Angular WebApp, https

  const keyboard = {
    inline_keyboard: [
      [{ text: 'Відкрити додаток', web_app: { url: webAppUrl } }]
    ]
  };

  bot.sendMessage(chatId, `Привіт, ${username}! Ваш chat ID: ${chatId}`, {
    reply_markup: keyboard
  });

  console.log(`User ${username} started the bot. Chat ID: ${chatId}`);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id.toString();
  currentChatId = chatId;
  console.log(`Received message from chatId: ${chatId}`);
});

app.get('/api/getCurrentChatId', (req, res) => {
  if (currentChatId) {
    res.status(200).json({ chatId: currentChatId });
  } else {
    res.status(404).json({ message: 'No chat ID available' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
