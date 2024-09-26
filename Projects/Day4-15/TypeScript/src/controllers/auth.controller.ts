import express, { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { userSignUp, userLogin, resetSchema, resetLinkSchema, deleteSchema } from "../utils/validators/userValidator";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken, verifyToken } from "../utils/jwt";
import passport from 'passport';
import { JwtPayload } from 'jsonwebtoken';
import '../config/passport';  // Initialize passport strategies
import { sendResetLinkMail, welcome } from "../utils/email";
import { profile } from "console";

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

    const sendMail = await welcome(email, name);

    res.status(201).json({ message: 'New user has been created', sendMail, token});
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

   try {
      // Extract email and name from the authenticated user (assuming it's provided by Google)
      const email = user.email;
      const name = user.name;

      // Ensure email and name exist
      if (!email || !name) {
        return res.status(400).json({ message: 'Missing email or name from user data' });
      }

      // Issue JWT on successful authentication
      const payload = { userId: user._id };
      const token = await generateToken(payload);

      // Send welcome email
      const sendMail = await welcome(email, name);

      // Respond with the JWT and email result
      return res.json({ message: 'Authentication successful', token, sendMail });

    } catch (err) {
      if (err instanceof Error) {
        console.error('Error with email');
        res.status(400).json({ message: 'Authentication successful, but email sending failed', error: err.message})
      } else {
        res.status(500).json({ message: 'Internal Server Error', error: err })
      }
    }
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

    const sendResetLink = sendResetLinkMail(email, exist.name, token)

    res.status(200).json({ message: 'Reset link sent', token})
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: err.message})
    } else {
      res.status(500).json({ message: 'Server Error', err})
    }
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    // Validate user input
    const { error, value } = resetSchema.validate(req.body);

    if (error) {
      throw new Error('Invalid user input');
    }

    const { password, confirmPassword } = value;
    const token = req.params.token;

    if (!token) {
      throw new Error('No token found');
    }

    // Verify the token and await its result
    const decoded = await verifyToken(token);
    console.log(decoded)

    if (!decoded) {
      throw new Error('Invalid token or token has expired');
    }
    
    // Extract userId from decoded object
    const userId = (decoded as JwtPayload).userId;
    console.log(userId);

    // Check that details belong to an existing user
    const user = await User.findOne({email: userId});

    if (!user) {
      throw new Error(`This user doesn't exist in our database. Please create an account.`);
    }

    // Check if password and confirm password are the same
    if (password !== confirmPassword) {
      throw new Error('Passwords must be the same');
    }

    // Hash the new password (assuming bcrypt is used)
    const hashedPassword = await hashPassword(password);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been updated' });

  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: err.message });
    } else {
      res.status(500).json({ message: 'Server Error', error: err });
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
    const check = await User.findOne({ email });

    if (!check) {
      throw Error(`This user isn't in our database`)
    }

    const del = await User.deleteOne({ email })

    res.status(204).json({ message: 'Successful delete', del});
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: 'Invalid', error: err.message});
    } else {
      res.status(500).json({ message: 'Server Error', err});
    }
  }
}
