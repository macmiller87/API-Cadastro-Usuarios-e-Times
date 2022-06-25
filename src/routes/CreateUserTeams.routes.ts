import { Router } from "express";
import { CreateUserTeamsController } from "@modules/CreateUserTeams/useCase/CreateUserTeams/CreateUserTeamsController";
import { ListSpecifcTeamController } from "@modules/CreateUserTeams/useCase/ListSpecifcTeam/ListSpecifcTeamController";
import { ensureUserAuthenticate } from "@utils/auth/EnsureUserAuthenticate";
import { router } from ".";
import { DeletSpecifcTeamController } from "@modules/CreateUserTeams/useCase/DeleteUserTeam/DeleteSpecifcTeamCotroller";

const createUserTeamsRoute = Router();
const listSpecifTeamRoute = Router();
const deleteSpecifcTeamRoute = Router();

const createUserTeamsController = new CreateUserTeamsController();
const listSpecifcTeamController = new ListSpecifcTeamController();
const deleteSpecificTeamController = new DeletSpecifcTeamController();

createUserTeamsRoute.use(ensureUserAuthenticate);
listSpecifTeamRoute.use(ensureUserAuthenticate);
deleteSpecifcTeamRoute.use(ensureUserAuthenticate);

createUserTeamsRoute.post("/", createUserTeamsController.handle);
listSpecifTeamRoute.get("/", listSpecifcTeamController.handle);
deleteSpecifcTeamRoute.delete("/", deleteSpecificTeamController.handle);

export { createUserTeamsRoute, listSpecifTeamRoute, deleteSpecifcTeamRoute };