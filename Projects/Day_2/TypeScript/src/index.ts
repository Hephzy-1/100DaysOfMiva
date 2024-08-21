import express, { Request, Response } from "express";
import config from "./config/env";
import connect from './config/db'

const app = express();
const PORT = config.PORT;

// Default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Hello World!'});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});