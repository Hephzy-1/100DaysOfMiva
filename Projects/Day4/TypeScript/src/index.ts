import express, { Request, Response } from "express";
import database from './config/db';
import config from './config/env';

const app = express();
const PORT = config.PORT;

// Connect DB
database();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to my authentication system'
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});