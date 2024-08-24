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
  clientID: config.CLIENT_ID!,
  clientSecret: config.CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const { id, emails } = profile;
  const email = emails?.[0].value;

  try {
    let user = await User.findOne({ googleId: id });

    if (!user && email) {
      const newUser = new User({ googleId: id, email });
      await newUser.save();
    }

    return done(null, user?.id);
  } catch (err) {
    return done(err);
  }
}));

export default passport;
