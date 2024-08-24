import jwt from "jsonwebtoken";
import config from "../config/env";

export const generateToken = async (payload: object) => {

  // Check if JWT_SECRET is defined
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  // Sign the jwt and return it
 jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h'})
}

export const verifyToken = async (token:string) => {

  // Check if JWT_SECRET is defined
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  // verify token
 jwt.verify(token, config.JWT_SECRET)
}