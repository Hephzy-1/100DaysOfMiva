// src/models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
});

const User: Model<IUser> = mongoose.model('User', userSchema);

export default User;
