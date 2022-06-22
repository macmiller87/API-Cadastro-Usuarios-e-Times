import { ICreateUsersToken } from "@modules/CreateUsers/dtos/ICreateUsersTokenDTO";
import { UsersToken } from "@modules/CreateUsers/entities/UsersToken";

interface IUsersTokenRepository {
    create({ user_id  }: ICreateUsersToken): Promise<UsersToken>;
};

export { IUsersTokenRepository };