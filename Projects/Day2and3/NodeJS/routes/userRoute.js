import e from "express";
import { createUser, getUser, updateUser, deleteUser } from "../controllers/userCon.js";
const route = e.Router();

route.post('/create', createUser);
route.get('/get', getUser);
route.put('/update', updateUser);
route.delete('/delete', deleteUser);

export default route;