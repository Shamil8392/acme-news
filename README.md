/* Этот код будет зависеть от того, как устроена ваша админ - панель и хранятся ли новости в базе данных.
Ниже предоставлен пример кода для добавления новости в базу данных при помощи формы. */
<!-- HTML код для формы добавления новости: -->
<!-- <form id="add-news-form">
  <input type="text" id="title" placeholder="Заголовок">
  <textarea id="content" placeholder="Текст новости"></textarea>
  <button type="submit">Добавить новость</button>
</form> -->

// Javascript код, который будет выполняться при отправке формы(с использованием AJAX запроса):

const addNewsForm = document.getElementById('add-news-form');

addNewsForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/news'); // замените '/api/news' на URL для добавления новости

  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    if (xhr.status === 200) {
      // новость успешно добавлена
      alert('Новость успешно добавлена!');
    } else {
      // произошла ошибка
      alert('Произошла ошибка при добавлении новости.');
    }
  };

  xhr.send(JSON.stringify({
    title: title,
    content: content
  }));
});

/* Вышеуказанный код предполагает, что у вас есть backend API, который будет принимать 
запросы на добавление новостей. Он также отправляет данные в формате JSON. */




/* Создание базы данных 
Пример создания базы данных новостей на MySQL: */

const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
};

(async () => {
  const connection = await mysql.createConnection(config);

  // создание базы данных
  await connection.query('CREATE DATABASE news');

  // использование базы данных
  await connection.query('USE news');

  // создание таблицы новостей
  await connection.query(`
    CREATE TABLE news (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      type ENUM('event', 'blog', 'task') NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    );
  `);

  // создание таблицы пользователей
  await connection.query(`
    CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY email (email)
    );
  `);

  // создание таблицы избранных новостей
  await connection.query(`
    CREATE TABLE favorites (
      user_id INT NOT NULL,
      news_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, news_id),
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (news_id) REFERENCES news (id) ON DELETE CASCADE
    );
  `);

  // создание таблицы комментариев
  await connection.query(`
    CREATE TABLE comments (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      news_id INT NOT NULL,
      comment TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (news_id) REFERENCES news (id) ON DELETE CASCADE
    );
  `);

  await connection.end();
})();
/* Создание сервера и маршрутов
Для работы с базой данных и обработки HTTP - запросов необходимо создать сервер и определить маршруты. */

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const config = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'news',
};

app.use(express.json());

// обработка запросов GET /news
app.get('/news', async (req, res) => {
  try {
    const connection = await mysql.createConnection(config);

    const [results] = await connection.query(`
      SELECT id, title, content, type, created_at
      FROM news
      ORDER BY created_at DESC
    `);

    await connection.end();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
  
/* В данном примере определен маршрут GET / news, который возвращает все новости из базы данных в формате JSON.

  Добавление новости
  Для добавления новости необходимо определить маршрут POST / news и обработчик этого маршрута.
  Также можно добавить проверку авторизации пользователя, который может добавлять новости. */

  // обработка запросов POST /news
  app.post('/news', async (req, res) => {
    try {
      const { title, content, type } = req.body;

      if (!title || !content || !type) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const connection = await mysql.createConnection(config);

      const [result] = await connection.query(`
      INSERT INTO news (title, content, type)
      VALUES (?, ?, ?)
    `, [title, content, type]);

      await connection.end();

      res.json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  /* Добавление новостей в избранное
  Для добавления новости в избранное необходимо определить маршрут POST / favorites и обработчик этого маршрута.
  Также необходимо проверить авторизацию пользователя и существование новости. */

  // обработка запросов POST /favorites
  app.post('/favorites', async (req, res) => {
    try {
      const { userId, newsId } = req.body;

      if (!userId || !newsId) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const connection = await mysql.createConnection(config);

      // проверка существования пользователя и новости
      const [userResult] = await connection.query(`
      SELECT id FROM users WHERE id = ?
    `, [userId]);

      const [newsResult] = await connection.query(`
      SELECT id FROM news WHERE id = ?
    `, [newsId]);

      if (!userResult[0] || !newsResult[0]) {
        return res.status(404).json({ error: 'User or news not found' });
      }

      await connection.query(`
      INSERT IGNORE INTO favorites (user_id, news_id)
      VALUES (?, ?)
    `, [userId, newsId]);

      await connection.end();

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  /* Просмотр избранных новостей
  Для просмотра избранных новостей необходимо определить маршрут GET / favorites и обработчик этого маршрута.
  Также необходимо проверить авторизацию пользователя и получить список избранных новостей. */

  // обработка запросов GET /favorites
  app.get('/favorites', async (req, res) => {
    try {
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const connection = await mysql.createConnection(config);

      // проверка существования пользователя
      const [userResult] = await connection.query(`
      SELECT id FROM users WHERE id = ?
    `, [userId]);

      if (!userResult[0]) {
        return res.status(404).json({ error: 'User not found' });
      }

      const [results] = await connection.query(`
      SELECT news.id, title, content, type, created_at
      FROM news
      JOIN favorites ON favorites.news_id = news.id
      WHERE favorites.user_id = ?
      ORDER BY favorites.created_at DESC
    `, [userId]);

      await connection.end();

      res.json(results);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  /* Добавление комментария
  Для добавления комментария необходимо определить маршрут POST / comments и обработчик этого маршрута.
  Также необходимо проверить авторизацию пользователя и существование новости. */

  // обработка запросов POST /comments
  app.post('/comments', async (req, res) => {
    try {
      const { userId, newsId, comment } = req.body;

      if (!userId || !newsId || !comment) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const connection = await mysql.createConnection(config);

      // проверка существования пользователя и новости
      const [userResult] = await connection.query(`
      SELECT id FROM users WHERE id = ?
    `, [userId]);

      const [newsResult] = await connection.query(`
      SELECT id FROM news WHERE id = ?
    `, [newsId]);

      if (!userResult[0] || !newsResult[0]) {
        return res.status(404).json({ error: 'User or news not found' });
      }

      await connection.query(`
      INSERT INTO comments (user_id, news_id, comment)
      VALUES (?, ?, ?)
    `, [userId, newsId, comment]);

      await connection.end();

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
  /* Получение комментариев к новости
  Для получения комментариев к новости необходимо определить маршрут GET / comments и обработчик этого маршрута. */

  // обработка запросов GET /comments
  app.get('/comments', async (req, res) => {
    try {
      const { newsId } = req.query;

      if (!newsId) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const connection = await mysql.createConnection(config);

      const [results] = await connection.query(`
      SELECT users.email, comments.comment, comments.created_at
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.news_id = ?
      ORDER BY comments.created_at DESC
    `, [newsId]);

      await connection.end();

      res.json(results);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

/*  В итоге мы создали базу данных новостей с таблицами для новостей, пользователей,
 избранных новостей и комментариев.Также мы создали сервер на Node.js и определили 
 маршруты для работы с базой данных и обработки HTTP - запросов.Теперь пользователь 
 может добавлять новости в избранное, просматривать избранные новости и комментировать блог и задачи. */