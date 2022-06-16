import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class Users {

    @PrimaryColumn()
    user_id: string;

    @Column()
    username: string;

    @Column()
    userAvatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    email: string;

    constructor() {
        if(!this.user_id) {
            this.user_id = uuidV4();
        }
    }
};

export { Users };