import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());



const bot = new TelegramBot('7551270818:AAFcpELcLOyg5R9gjZ4SGIEqqwRJXbJl3Y0', { polling: true });

let currentUserData = {}; // Глобальний об'єкт для зберігання даних поточного користувача
let currentChatId = null; // Variable to store the current chatId

// Обробка команди /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;  // Отримуємо chat.id користувача
  const username = msg.from.username;

  // Вивести в чат ID та привітання
  bot.sendMessage(chatId, `Hello, ${username}! Your chat ID is: ${chatId}`);
  console.log(`User ${username} started the bot. Chat ID: ${chatId}`);
});

// Обробка повідомлень для отримання даних користувача
bot.on('message', async (msg) => {
  const chatId = msg.chat.id.toString(); // Перетворюємо chatId на рядок
  currentChatId = chatId; // Store the current chatId
  console.log(`Received message from chatId: ${chatId}`);

 
});




// GET запит для отримання поточного chatId
app.get('/api/getCurrentChatId', (req, res) => {
  if (currentChatId) {
    res.status(200).json({ chatId: currentChatId });
  } else {
    res.status(404).json({ message: 'No chat ID available' });
  }
});

// Логування, щоб побачити, коли сервер працює
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
