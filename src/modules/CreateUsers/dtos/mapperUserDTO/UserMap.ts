import { IUserRenponseDTO } from "./IUserRenponseDTO";
import { Users } from "../../entities/Users";
import { instanceToInstance } from "class-transformer";

class UserMap {

    static toDTO({ user_id, username, userAvatar, email  }: Users): IUserRenponseDTO {

        const user = instanceToInstance({
            user_id,
            username,
            userAvatar,
            email
        });

        return user;
    };

};

export { UserMap };