import mongoose, { Schema } from 'mongoose';

const OTPVerification = new Schema({
  userId: String,
  otp: String,
  createdAt: String,
  expiresAt: String
});

const UserOTP = mongoose.model('otp', OTPVerification);

export default UserOTP;