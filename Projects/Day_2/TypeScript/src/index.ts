import express, { Request, Response } from "express";
import config from "./config/env";
import connect from './config/db';
import userRoutes from './routes/user.route';

const app = express();
const PORT = config.PORT;

// Connect to MongoDB
connect();

// Default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Hello World!'});
});

// user Routes
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});