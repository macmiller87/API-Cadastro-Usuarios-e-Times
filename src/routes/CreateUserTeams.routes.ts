import { Router } from "express";
import { CreateUserTeamsController } from "@modules/CreateUserTeams/useCase/CreateUserTeams/CreateUserTeamsController";
import { ListSpecifcTeamController } from "@modules/CreateUserTeams/useCase/ListSpecifcTeam/ListSpecifcTeamController";
import { ensureUserAuthenticate } from "@utils/auth/EnsureUserAuthenticate";

const createUserTeamsRoute = Router();
const listSpecifTeamRoute = Router();

const createUserTeamsController = new CreateUserTeamsController();
const listSpecifcTeamController = new ListSpecifcTeamController();

createUserTeamsRoute.use(ensureUserAuthenticate);
listSpecifTeamRoute.use(ensureUserAuthenticate);

createUserTeamsRoute.post("/", createUserTeamsController.handle);
listSpecifTeamRoute.get("/", listSpecifcTeamController.handle);

export { createUserTeamsRoute, listSpecifTeamRoute };