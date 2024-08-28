import { Router } from "express";
import { signUp, logIn, oAuth, resetLink, resetPassword, deleteUser } from '../controllers/auth.controller';
import passport from 'passport';

const route = Router();

route.post('/signup', signUp);
route.post('/login', logIn);
route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
route.get('/google/callback', oAuth);
route.post('/reset-link', resetLink);
route.put('/reset/:token', resetPassword);
route.delete('/delete', deleteUser);

export default route;
