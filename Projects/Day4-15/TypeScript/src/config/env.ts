import dotenv from 'dotenv';
dotenv.config();

const config = Object.freeze({
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  OAUTH_URL: process.env.OAUTH_URL,
  EMAIL: process.env.EMAIL,
  EMAIL_PASS: process.env.EMAIL_PASS
});

export default config;