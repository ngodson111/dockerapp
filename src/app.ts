import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import pool from "./db";

const app = express();
app.use(express.json());

app.get("/setup", async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();

    const response = await connection.query(`CREATE TABLE IF NOT EXISTS users(
      id int PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age VARCHAR(255) NOT NULL
    )`);

    console.log(response);

    connection.release();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Bad request" });
  }
});

app
  .post("/users", async (req: Request, res: Response) => {
    const { name, age } = req.body;

    try {
      const connection = await pool.getConnection();

      const sql = `INSERT INTO users(name,age) VALUES(?,?)`;
      await connection.query(sql, [name, age]);

      connection.release();
      res.status(200).json({ message: "Data is created" });
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  })
  .get("/users", async (req: Request, res: Response) => {
    try {
      const connection = await pool.getConnection();

      const sql = `SELECT * FROM users`;
      const [response] = await connection.query(sql);

      connection.release();
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  })
  .put("/users", (req: Request, res: Response) => {
    res.status(200).json({ message: "Data is updated" });
  })
  .delete("/users", (req: Request, res: Response) => {
    res.status(204).json({ message: "Data is deleted" });
  });

const port = process.env.PORT || 4040;
app.listen(port, () => console.log(`Server running on port: ${port}`));

// docker run -d --name mysql-server -e MYSQL_ROOT_PASSWORD=password -e MYSQL_USER=narayan -e MYSQL_PASSWORD=Narayan@321 -p 3306:3306 mysql:latest
