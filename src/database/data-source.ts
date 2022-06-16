import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../modules/CreateUsers/entities/Users";
import { CreateUsers1655346386730 } from "./migrations/1655346386730-CreateUsers";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    synchronize: false,
    logging: false,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [Users],
    subscribers: [],
    migrations: [CreateUsers1655346386730]
});

export async function createConnection() {
    
    try{
        await AppDataSource.initialize();
        console.log("Database Connected");
    }catch(error){
        console.log("Error During Connection", error);
    }
    
};

// export function createConnection(host = "database"): Promise<DataSource> {
//     return dataSource.setOptions({ host }).initialize();
// }

