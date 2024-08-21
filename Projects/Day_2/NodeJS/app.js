import express from "express";
import connect from "./config/db.js";
import config from "./config/env.js";

const app = express();
const PORT = config.PORT;

// Default route
app.get('/', (req, res) => {
  res.status(200).json({message: 'Hello World!'});
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});