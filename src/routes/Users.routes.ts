import { Router } from "express";
import { CreateUsersController } from "@modules/CreateUsers/useCase/CreateUser/CreateUsersController";
import { ListUserController } from "@modules/CreateUsers/useCase/ListUser/ListUserController";
import { ensureUserAuthenticate } from "@utils/auth/EnsureUserAuthenticate";

const UsersRoute = Router();
const listUserRoute = Router(); 

const createUsers = new CreateUsersController();
const listUserController = new ListUserController();

listUserRoute.use(ensureUserAuthenticate);

UsersRoute.post("/", createUsers.handle);
listUserRoute.get("/", listUserController.handle);

export { UsersRoute, listUserRoute };