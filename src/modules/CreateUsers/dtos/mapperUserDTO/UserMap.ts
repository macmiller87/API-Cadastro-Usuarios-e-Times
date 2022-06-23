import { IUserRenponseDTO } from "./IUserRenponseDTO";
import { instanceToInstance } from "class-transformer";
import { Users } from "@modules/CreateUsers/entities/Users";

class UserMap {

    static toDTO({ user_id, username, userAvatar, email  }: Users): IUserRenponseDTO {

        const user = instanceToInstance({
            user_id,
            username,
            userAvatar,
            email,
        });

        return user;
    };
};

export { UserMap };