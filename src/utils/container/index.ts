import { container } from "tsyringe";

import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";
import { UsersRepository } from "@modules/CreateUsers/repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

