import { Request, Response } from 'express';
import User from '../models/users';

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: 'Mew user created', newUser})
  } catch (err) {
    if (err instanceof Error) { // Type narrowing
      console.error(err.message);
      res.status(400).json({ message: err.message})

    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err)

    }
  }
}