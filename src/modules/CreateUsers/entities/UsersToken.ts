import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Users } from "./Users";

@Entity("users_tokens")
class UsersToken {

    @PrimaryColumn()
    id?: string;

    @Column()
    user_id: string;

    @ManyToOne((type) => Users)
    @JoinColumn({ name: "user_id" })
    user: Users;

    @CreateDateColumn()
    created_at: Date;

    constructor() {

        if(!this.id) {
            this.id = uuidV4();
        }
    };
};

export { UsersToken };