// src/config/passport.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './env';
import { comparePassword } from '../utils/hash';
import User from '../models/userModel';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password!);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:4080/auth/google/callback',
},
async (token, tokenSecret, profile, done) => {
  try {
    console.log(profile); // Log the profile to check what data is available
    
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    } else {
      user = new User({
        googleId: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName || "Unnamed User",  // Fallback in case displayName is missing
        // Add other fields as needed
      });

      await user.save();
      return done(null, user);
    }
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
