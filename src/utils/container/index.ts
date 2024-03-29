import { container } from "tsyringe";

import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";
import { UsersRepository } from "@modules/CreateUsers/repositories/UsersRepository";

import { IUsersTokenRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersTokenRepository";
import { UsersTokenRepository } from "@modules/CreateUsers/repositories/UsersTokenRepository";

import { IUsersTeamsRepository } from "@modules/CreateUserTeams/repositories/InplementationsRepository/IUsersTeamsRepository";
import { TeamsRepository } from "@modules/CreateUserTeams/repositories/TeamsRepository";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
    "UsersTokenRepository",
    UsersTokenRepository
);

container.registerSingleton<IUsersTeamsRepository>(
    "TeamsRepository",
    TeamsRepository
);