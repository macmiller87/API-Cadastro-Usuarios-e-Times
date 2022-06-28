import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

import { Users } from "../modules/CreateUsers/entities/Users";
import { Teams } from "../modules/CreateUserTeams/entities/Teams";
import { UsersToken } from "../modules/CreateUsers/entities/UsersToken";

import { CreateUser1655711870659 } from "./migrations/1655711870659-CreateUser";
import { CreateUsersToken1655784996610 } from "./migrations/1655784996610-CreateUsersToken";
import { CreateUserTeams1655754301909 } from "./migrations/1655754301909-CreateUserTeams";

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    synchronize: false,
    logging: false,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.NODE_ENV === "test" ? "dbtest" : process.env.POSTGRES_DATABASE,
    entities: [Users, Teams, UsersToken],
    subscribers: [],
    migrations: [
        CreateUser1655711870659,
        CreateUsersToken1655784996610,
        CreateUserTeams1655754301909
    ]
});

export async function createConnection(host = process.env.POSTGRES_HOST): Promise<DataSource> {
    
    try{
        console.log("Database Connected 📦");
        return await AppDataSource.setOptions({ host }).initialize();
    }catch(error){
        console.log("Error During Connection", error);
    }
    
};

// export function createConnection(host = "database"): Promise<DataSource> {
//     return dataSource.setOptions({ host }).initialize();
// }