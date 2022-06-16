import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { IUsersRepository } from "./IUsersRepository";
import { Repository } from "typeorm";
import { Users } from "../entities/Users";
import { AppDataSource } from "../../../database/data-source";


class UsersRepository implements IUsersRepository {

    private usersRepository: Repository<Users>

    constructor() {
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async create({ username, userAvatar, email }: ICreateUsersDTO): Promise<void> {
        
        const users = this.usersRepository.create({
            username,
            userAvatar,
            email
        });

        await this.usersRepository.save(users);
    }

    async findByUsername(username: string): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ username });
        return user;
    }
};

export { UsersRepository };