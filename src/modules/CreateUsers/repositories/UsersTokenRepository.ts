import { AppDataSource } from "@database/data-source";
import { Repository } from "typeorm";
import { UsersToken } from "@modules/CreateUsers/entities/UsersToken";
import { ICreateUsersToken } from "@modules/CreateUsers/dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "./InplementationsRepository/IUsersTokenRepository";

class UsersTokenRepository implements IUsersTokenRepository {

    private repository: Repository<UsersToken>;

    constructor() {
        this.repository = AppDataSource.getRepository(UsersToken);
    }

    async create({ user_id  }: ICreateUsersToken): Promise<UsersToken> {

        const usertoken = this.repository.create({
            user_id
        });

        await this.repository.save(usertoken);

        return usertoken;
    };
    
};

export { UsersTokenRepository };