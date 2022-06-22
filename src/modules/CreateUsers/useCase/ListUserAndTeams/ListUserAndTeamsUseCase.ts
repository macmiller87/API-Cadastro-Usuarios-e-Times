import { Users } from "@modules/CreateUsers/entities/Users";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";
import { AppError } from "@utils/errors/AppError";

class ListUserAndTeamsUseCse {

    constructor(private usersRepository: IUsersRepository) {}

    async execute(user_id: string): Promise<Users[]> { 
        const userId = await this.usersRepository.findByUserId(user_id);

        if(!userId) {
            throw new AppError("User Not Found!", 404);
        }

        const user = await this.usersRepository.ListUsers();
        return user;
    }
};

export { ListUserAndTeamsUseCse };