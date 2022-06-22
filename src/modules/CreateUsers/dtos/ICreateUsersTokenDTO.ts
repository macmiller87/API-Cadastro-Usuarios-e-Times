import { Users } from "../entities/Users";

interface ICreateUsersTokenDTO {
   token: string;
   user: Pick<Users, "user_id" | "username" | "email" >;
};

interface ICreateUsersToken {
   user_id: string;
};

export { ICreateUsersTokenDTO, ICreateUsersToken };