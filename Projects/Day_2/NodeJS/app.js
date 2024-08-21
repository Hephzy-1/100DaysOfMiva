import express from "express";
import connect from "./config/db.js";
import config from "./config/env.js";
import userRoute from "./routes/userRoute.js";

const app = express();
const PORT = config.PORT;

// Default route
app.get('/', (req, res) => {
  res.status(200).json({message: 'Hello World!'});
});

// user routes
app.use('/user', userRoute);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});