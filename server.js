import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = {
  user: 'buy5time1_usrprod',
  password: 'Fj@7!bnf%0rr',
  server: '176.121.15.81',
  database: 'buytime',
  port: 1435,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};

const bot = new TelegramBot('7551270818:AAFcpELcLOyg5R9gjZ4SGIEqqwRJXbJl3Y0', { polling: true });

let currentUserData = {}; // Глобальний об'єкт для зберігання даних поточного користувача

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
  console.log(`Received message from chatId: ${chatId}`);

  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT Id, FirstName, LastName, Role, Email, Description, Tags
      FROM Users
      WHERE TelegramChatId = @TelegramChatId
    `;

    const result = await pool.request()
      .input('TelegramChatId', sql.NVarChar, chatId)
      .query(query);

    if (result.recordset.length > 0) {
      currentUserData = result.recordset[0]; // Зберігаємо дані поточного користувача
      bot.sendMessage(chatId, `Hello ${currentUserData.Id}${currentUserData.FirstName} ${currentUserData.LastName}, here are your details:\nRole: ${currentUserData.Role}\nEmail: ${currentUserData.Email}\nDescription: ${currentUserData.Description}\nTags: ${currentUserData.Tags}`);
    } else {
      bot.sendMessage(chatId, 'User not found');
    }
  } catch (err) {
    console.error('Database error:', err);
    bot.sendMessage(chatId, 'Error fetching your data.');
  }
});

// GET запит для отримання даних поточного користувача
app.get('/api/getCurrentUserData', (req, res) => {
  if (Object.keys(currentUserData).length > 0) {
    res.status(200).json(currentUserData);
  } else {
    res.status(404).json({ message: 'No user data available' });
  }
});

// GET запит для отримання даних користувача за chatId
app.get('/api/getUserData/:chatId', async (req, res) => {
  const { chatId } = req.params;

  try {
    const pool = await sql.connect(config);
    const query = `
      SELECT FirstName, LastName, Role, Email, Description, Tags
      FROM Users
      WHERE TelegramChatId = @TelegramChatId
    `;

    const result = await pool.request()
      .input('TelegramChatId', sql.NVarChar, chatId)
      .query(query);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Логування, щоб побачити, коли сервер працює
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
