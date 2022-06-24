import { Users } from "../../../modules/CreateUsers/entities/Users";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("teams")
class Teams {

    @PrimaryColumn()
    team_id?: string;

    @Column()
    user_id: string;

    @ManyToOne((type) => Users, (user) => user.teams)
    @JoinColumn({ name: "user_id" })
    user: Users;

    @Column()
    teamName: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.team_id) {
            this.team_id = uuidV4();
        }
    };
    
};

export { Teams };