import { Teams } from "../../CreateUserTeams/entities/Teams";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class Users {

    @PrimaryColumn()
    user_id?: string;

    @Column()
    username: string;

    @Column()
    userAvatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;
    
    @OneToMany((type) => Teams, (team) => team.user, { eager: true })
    teams: Teams[]

    constructor() {

        if(!this.user_id) {
            this.user_id = uuidV4();
        }
    };
    
};

export { Users };