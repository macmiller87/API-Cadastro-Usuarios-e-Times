import { Router } from "express";
import { ensureUserAuthenticate } from "@utils/auth/EnsureUserAuthenticate";
import { CreateUsersController } from "@modules/CreateUsers/useCase/CreateUser/CreateUsersController";
import { ListUserController } from "@modules/CreateUsers/useCase/ListUser/ListUserController";
import { ListUserTeamsController } from "@modules/CreateUsers/useCase/ListUserTeams/ListUserTeamsController";
import { DeleteUserController } from "@modules/CreateUsers/useCase/DeleteUser/DeleteUserController";

const CreateUserRoute = Router();
const listUserRoute = Router(); 
const listUserAndTeamsRoute = Router();
const deleteUserRoute = Router();

const createUsers = new CreateUsersController();
const listUserController = new ListUserController();
const listUserteamsController = new ListUserTeamsController();
const deleteUserController = new DeleteUserController();

listUserRoute.use(ensureUserAuthenticate);
listUserAndTeamsRoute.use(ensureUserAuthenticate);
deleteUserRoute.use(ensureUserAuthenticate);

CreateUserRoute.post("/", createUsers.handle);
listUserRoute.get("/", listUserController.handle);
listUserAndTeamsRoute.get("/", listUserteamsController.handle);
deleteUserRoute.delete("/", deleteUserController.handle);

export { CreateUserRoute, listUserRoute, listUserAndTeamsRoute, deleteUserRoute };