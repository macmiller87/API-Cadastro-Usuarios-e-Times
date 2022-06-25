import { inject, injectable } from "tsyringe";
import { AppError } from "@utils/errors/AppError";
import { Users } from "@modules/CreateUsers/entities/Users";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";

@injectable()
class ListUserTeamsUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository ){}

    async execute(user_id: string): Promise<Users[]> {

        try {
            const listUserTeams = await this.usersRepository.listUserAndTeams(user_id);

            return listUserTeams;

        }catch(error) {
            throw new AppError("User Not Found!", 404);
            
        }
    };

};

export { ListUserTeamsUseCase };