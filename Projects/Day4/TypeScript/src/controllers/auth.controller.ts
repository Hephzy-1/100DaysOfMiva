import express, { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { userSignUp, userLogin, resetSchema, resetLinkSchema, deleteSchema } from "../utils/validators/userValidator";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken, verifyToken } from "../utils/jwt";
import passport from 'passport';
import crypto from 'crypto';
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
    
    const payload = { userId: email};
    const token = await generateToken(payload);

    const newUser = new User({
      name,
      email,
      password: hashed 
    });

    await newUser.save();

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
    console.log(user)
    if (!user || !user.password) {
      throw new Error("User doesn't exist or password is missing");
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = { userId: user._id };
    const token = await generateToken(payload);

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
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }, async (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(400).json({ message: 'Authentication failed', error: err });
    }
    if (!user) {
      console.log('No user found:', info);
      return res.status(400).json({ message: 'Authentication failed', error: info });
    }

    // On successful authentication, issue JWT
    const payload = { userId: user._id };
    const token = await generateToken(payload);

    res.json({ token });
  })(req, res, next);
};

export const resetLink = async (req:Request, res:Response) => {
  try {
    const { error, value } = resetLinkSchema.validate(req.body);

    if (error) {
      throw Error('Invalid user details');
    }

    const { email } = value;

    const exist = User.find({ email });
    console.log(exist)

    if (!exist) {
      throw Error(`This account doesn't exist. Please create an account`);
    }

    const payload = { userId: email }
    const token = await generateToken(payload);

    res.status(200).json({ message: 'Reset link sent', token})
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: err.message})
    } else {
      res.status(500).json({ message: 'Server Error', err})
    }
  }
}

export async function resetPassword (req: Request, res: Response) {
  try {

    // Check user input
    const { error, value } = resetSchema.validate(req.body)

    // In case user input is invalid
    if (error) {
      throw Error('Invalid user input')
    }

    const { password, confirmPassword } = value;

    // Extract token from request link
    const token = req.params.token;

    // make sure token is in link
    if (!token) {
      Error('No token found')
    }

    // verify the token
    const decoded = verifyToken(token)

    if (!decoded) {
      Error('Invalid token or token has expired')
    }

    // Check that details belong to existing user
    const user = User.findOne(decoded)

    if (!user) {
      throw Error(`This user doesn't exixt in our database. Please create an account.`)
    }

    // Check if password and confirm password is the same
    if (password !== confirmPassword) {
      throw Error('Passwords must be the same')
    }

    // Update user password
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password has been updated' })

  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: err.message })
    } else {
      res.status(500).json({ message: 'Server Error', err })
    }
  }
}

export async function deleteUser (req:Request, res:Response) {
  try {
    // Validate user input
    const { error, value } = deleteSchema.validate(req.body);

    if (error) {
      throw Error('Invalid user input')
    }

    const { email } = value;

    // Check if user exist
    const check = User.findOne({ email });

    if (!check) {
      throw Error(`This user isn't in our database`)
    }

    const del = User.deleteOne({ email })

    res.status(200).json({ message: 'Successful delete', del});
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: err.message});
    } else {
      res.status(500).json({ message: 'Server Error', err});
    }
  }
}
