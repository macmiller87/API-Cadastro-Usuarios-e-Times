import { Router } from "express";
import { CreateUsersController } from "@modules/CreateUsers/useCase/CreateUser/CreateUsersController";
import { ListUserController } from "@modules/CreateUsers/useCase/ListUser/ListUserController";
import { ensureUserAuthenticate } from "@utils/auth/EnsureUserAuthenticate";

const CreateUserRoute = Router();
const listUserRoute = Router(); 

const createUsers = new CreateUsersController();
const listUserController = new ListUserController();

listUserRoute.use(ensureUserAuthenticate);

CreateUserRoute.post("/", createUsers.handle);
listUserRoute.get("/", listUserController.handle);

export { CreateUserRoute, listUserRoute };