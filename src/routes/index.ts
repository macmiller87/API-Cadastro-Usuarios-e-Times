import { Router } from "express";
import { AuthenticateUserRoute } from "./AuthenticateUser.routes";
import { CreateUserRoute, listUserRoute, listUserAndTeamsRoute, deleteUserRoute, } from "./Users.routes";
import { createUserTeamsRoute, listSpecifTeamRoute, deleteSpecifcTeamRoute } from "./CreateUserTeams.routes";

const router = Router();

router.use("/createUser", CreateUserRoute);
router.use("/sessions", AuthenticateUserRoute);
router.use("/profile", listUserRoute);
router.use("/profileUserAndTeams", listUserAndTeamsRoute);
router.use("/deleteUser", deleteUserRoute);

router.use("/createUserTeams", createUserTeamsRoute);
router.use("/listSpecifTeam", listSpecifTeamRoute);
router.use("/deleteTeam", deleteSpecifcTeamRoute);

export { router };