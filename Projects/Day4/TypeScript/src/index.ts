import express, { Request, Response } from "express";
import database from './config/db';
import config from './config/env';
import passportConfig from './config/passport';
import authRoute from './routes/auth.route';
import passport from "passport";
import path from 'path';
import cookieParser from "cookie-parser";
import OTP from "./models/userOTP";

const app = express();
const PORT = config.PORT;

// Connect DB
database();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Initialize passport middleware
app.use(passport.initialize());

// Initialize cookie parser
app.use(cookieParser());

// Home endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to my authentication system'
  });
});

// Define your API routes
app.use('/auth', authRoute);

// Fallback route for React SPA, serves index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
