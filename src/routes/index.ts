import { Router } from "express";
import { AuthenticateUserRoute } from "./AuthenticateUser.routes";
import { CreateUserRoute, listUserRoute } from "./Users.routes";
import { createUserTeamsRoute, listSpecifTeamRoute } from "./CreateUserTeams.routes";

const router = Router();

router.use("/createUser", CreateUserRoute);
router.use("/sessions", AuthenticateUserRoute);
router.use("/profile", listUserRoute);

router.use("/createUserTeams", createUserTeamsRoute);
router.use("/listSpecifTeam", listSpecifTeamRoute);

export { router };