import { Router } from "express";
import { signUp, logIn, oAuth } from '../controllers/auth.controller';
import passport from 'passport';

const route = Router();

route.post('/signup', signUp);
route.post('/login', logIn);
route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
route.get('/google/callback', oAuth);

export default route;
