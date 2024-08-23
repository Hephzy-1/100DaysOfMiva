import express, { Request, Response } from "express";

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, World!'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})