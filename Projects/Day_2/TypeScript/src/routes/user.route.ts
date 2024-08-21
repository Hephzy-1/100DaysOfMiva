import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const route = Router();

route.post('/create', createUser);

export default route;