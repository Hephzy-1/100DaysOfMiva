import express, { Request, Response } from "express";
import database from './config/db';
import config from './config/env';
import passportConfig from './config/passport';
import authRoute from './routes/auth.route';
import passport from "passport";

const app = express();
const PORT = config.PORT;

// Connect DB
database();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport middleware
app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to my authentication system'
  })
});

app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});