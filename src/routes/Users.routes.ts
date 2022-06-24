import { Router } from "express";
import { CreateUsersController } from "@modules/CreateUsers/useCase/CreateUser/CreateUsersController";
import { ListUserController } from "@modules/CreateUsers/useCase/ListUser/ListUserController";
import { ensureUserAuthenticate } from "@utils/auth/EnsureUserAuthenticate";
import { ListUserTeamsController } from "@modules/CreateUsers/useCase/ListUserTeams/ListUserTeamsController";

const CreateUserRoute = Router();
const listUserRoute = Router(); 
const listUserAndTeamsRoute = Router();

const createUsers = new CreateUsersController();
const listUserController = new ListUserController();
const listUserteamsController = new ListUserTeamsController();

listUserRoute.use(ensureUserAuthenticate);
listUserAndTeamsRoute.use(ensureUserAuthenticate);

CreateUserRoute.post("/", createUsers.handle);
listUserRoute.get("/", listUserController.handle);
listUserAndTeamsRoute.get("/", listUserteamsController.handle);

export { CreateUserRoute, listUserRoute, listUserAndTeamsRoute };