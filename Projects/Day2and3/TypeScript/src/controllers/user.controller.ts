import { Request, Response } from 'express';
import User from '../models/users';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
 
    if (!email || !name) {
      throw new Error('Email and name are required');
    }

    const check = await User.findOne({email});

    if (check) {
      throw Error('This user already exists');
    }
    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: 'New user created', newUser})
  } catch (err) {
    if (err instanceof Error) { // Type narrowing
      console.error(err.message);
      res.status(400).json({ message: err.message});

    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};

export async function getUser (req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('Email is required');
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
      throw Error('User cannot be found')
    }

    res.status(200).json({ message: "Here is the user details:", findUser });
  } catch (err) {
    if (err instanceof Error) { // Type narrowing
      console.error(err.message);
      res.status(400).json({ message: err.message});

    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};

export async function updateUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;

    if (!email || !name) {
      throw new Error('Email and name is required');
    }

    const find = await User.findOne({ email });

    if (!find) {
      throw Error('User not found');
    }

    const update = await User.updateOne({ name });
    res.status(200).json({
      message: 'Name has been updated'
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message});
    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('Email is required');
    }
    const find = await User.findOne({ email });

    if (!find) {
      throw Error('User not found')
    }

    const del = await User.deleteOne({ email });

    res.status(200).json({ message: 'User details has been deleted'});
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message});
    } else {
      console.error("An unknown error occurred:", err);
      res.status(500).json(err);
    }
  }
};