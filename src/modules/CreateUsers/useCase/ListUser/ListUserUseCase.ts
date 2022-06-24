import { inject, injectable } from "tsyringe";
import { AppError } from "@utils/errors/AppError";
import { IUserRenponseDTO } from "@modules/CreateUsers/dtos/mapperUserDTO/IUserRenponseDTO";
import { UserMap } from "@modules/CreateUsers/dtos/mapperUserDTO/UserMap";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";

@injectable()
class ListUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository ) {}

    async execute(user_id: string): Promise<IUserRenponseDTO> {

        try {
            const user = await this.usersRepository.listUser(user_id); 

            return UserMap.toDTO(user);

        }catch(error) {
            throw new AppError("User Not Found!", 404);
            
        }
    };

};

export { ListUserUseCase };