const pool = require("../dbconfig/dbConnector");

class TodosController {
  async get(req, res) {
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM todos ORDER BY id asc";
      const { rows } = await client.query(sql);
      const todos = rows;

      client.release();

      res.send(todos);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async post(req, res) {
    try {
      console.log(req.body);
      const { id, title, isFinished } = req.body;
      const client = await pool.connect();

      const insert = `INSERT INTO todos(id, title, "isFinished")  VALUES ($1, $2, $3)`;
      const insertTodo = [id, title, isFinished];

      await client.query(insert, insertTodo);
      await client.query("COMMIT");
      client.release();

      res.send("todos");
    } catch (error) {
      res.status(400).send(error);
      client.release();
    }
  }

  async put(req, res) {
    try {
      console.log(req.body);

      const { id, title, isFinished } = req.body;
      const client = await pool.connect();
      const update = `UPDATE todos SET title = $1, "isFinished" = $2 WHERE id = $3`;
      const updateTodo = [title, isFinished, id];
      await client.query(update, updateTodo);
      await client.query("COMMIT");
      client.release();
      res.send("todos");
    } catch (error) {
      res.status(400).send(error);
      client.release();
    }
  }
}

module.exports = TodosController;
