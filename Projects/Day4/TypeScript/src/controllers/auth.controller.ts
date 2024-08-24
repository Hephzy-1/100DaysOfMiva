import express, { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { userSignUp, userLogin } from "../utils/validators/userValidator";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken, verifyToken } from "../utils/jwt";
import passport from 'passport';
import '../config/passport';  // Initialize passport strategies

export async function signUp(req:Request, res: Response) {
  try {

    const { error, value } = userSignUp.validate(req.body);

    if (error) {
      throw Error('Invalid user details')
    }

    const { name, email, password } = value;

    // Check if user exists
    const exist = await User.findOne({ email });

    if (exist) {
      throw Error('User already exists');
    }

    const hashed = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashed 
    });

    await newUser.save();

    const payload = { userID: newUser.id };
    const token = await generateToken(payload);
    console.log(token)

    res.status(201).json({ message: 'New user has been created', token});
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', err: err.message});
    } else {
      res.status(500).json({ message: 'Internal Server Error'})
    }
  }
}

export async function logIn(req: Request, res: Response) {
  try {
    const { error, value } = userLogin.validate(req.body);

    if (error) {
      throw new Error('Invalid user details');
    }

    const { email, password } = value;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      throw new Error("User doesn't exist or password is missing");
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = { userId: user.id };
    const token = generateToken(payload);

    res.status(200).json({ message: 'Success', token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export function oAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Authentication failed', error: info });
    }

    // On successful authentication, issue JWT
    const payload = { userId: user.id };
    const token = generateToken(payload);

    res.json({ token });
  })(req, res, next);
};
