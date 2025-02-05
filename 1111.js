import sql from 'mssql';
import fs from 'fs';

// Параметри підключення до бази даних
const config = {
  user: 'buy5time1_usrprod',
  password: 'Fj@7!bnf%0rr',
  server: '176.121.15.81',
  port: 1435,
  database: 'buytime',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Запит до бази даних та експорт у JSON
async function exportDataToJson() {
  try {
    // Підключення до бази даних
    await sql.connect(config);

    const result = await sql.query('SELECT * FROM Users'); // Заміни `your_table` на реальну таблицю

    // Запис даних у JSON-файл
    const jsonData = JSON.stringify(result.recordset, null, 2);
    fs.writeFileSync('data1.json', jsonData);

    console.log('Data successfully exported to data.json');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Закриття з'єднання
    sql.close();
  }
}

exportDataToJson();
