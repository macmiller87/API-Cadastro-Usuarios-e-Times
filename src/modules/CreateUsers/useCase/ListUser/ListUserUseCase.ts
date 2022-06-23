import { IUserRenponseDTO } from "@modules/CreateUsers/dtos/mapperUserDTO/IUserRenponseDTO";
import { UserMap } from "@modules/CreateUsers/dtos/mapperUserDTO/UserMap";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";
import { AppError } from "@utils/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository ) {}

    async execute(user_id: string): Promise<IUserRenponseDTO> {
        const user = await this.usersRepository.findByUserId(user_id);
 
        return UserMap.toDTO(user);
    };

};

export { ListUserUseCase };