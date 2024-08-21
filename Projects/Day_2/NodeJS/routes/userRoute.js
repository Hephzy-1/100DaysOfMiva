import e from "express";
import { createUser } from "../controllers/userCon.js";
const route = e.Router();

route.post('/create', createUser);

export default route;