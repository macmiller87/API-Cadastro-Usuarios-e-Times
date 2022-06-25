import { ICreateUsersDTO } from "@modules/CreateUsers/dtos/ICreateUsersDTO";
import { IUsersRepository } from "./InplementationsRepository/IUsersRepository";
import { Repository } from "typeorm";
import { Users } from "@modules/CreateUsers/entities/Users";
import { AppDataSource } from "@database/data-source";

class UsersRepository implements IUsersRepository {

    private usersRepository: Repository<Users>

    constructor() {
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async create({ username, userAvatar, email, password }: ICreateUsersDTO): Promise<Users> {
        
        const users = this.usersRepository.create({
            username,
            userAvatar,
            email,
            password
        });

        await this.usersRepository.save(users);

        return users;
    };

    async findByUsername(username: string): Promise<Users> {
        const userByusername = await this.usersRepository.findOneBy({ username });
        return userByusername;
    };

    async findByEmail(email: string): Promise<Users> {
        const userByemail = await this.usersRepository.findOneBy({ email });
        return userByemail;
    };

    async findByUserId(user_id: string): Promise<Users> {
        const userById = await this.usersRepository.findOneBy({ user_id });
        return userById;
    }

    async listUser(user_id: string): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ user_id });
        return user;
    };

    async deleteUser(user_id: string): Promise<void> {
        await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(Users)
        .where("user_id = :user_id", { user_id: user_id })
        .execute()
    };

    async listUserAndTeams(user_id: string): Promise<Users[]> {
        const userTeams = await this.usersRepository.find({
            relations: {
                teams: true
            },
            where: {
                user_id: user_id
            }   
        });
        return userTeams;
    };

};

export { UsersRepository };