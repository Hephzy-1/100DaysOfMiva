import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/user.controller";

const route = Router();

route.post('/create', createUser);
route.get('/get', getUser);
route.put('/update', updateUser);
route.delete('/delete', deleteUser);

export default route;