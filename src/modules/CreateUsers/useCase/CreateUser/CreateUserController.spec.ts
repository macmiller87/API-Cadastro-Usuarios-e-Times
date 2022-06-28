import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../../app";
import { createConnection } from "@database/data-source";

let connection: DataSource;

describe("Create User Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to create a new User", async () => {
        const user = await request(app).post("/createUser").send({
            username: "Seu Madruga",
            userAvatar: "Madruguinha",
            email: "madruguinha@gmail.com",
            password: "171"

        });

        expect(user.status).toBe(201);
    });

    it("Should not be able to create a User, if username is already in use", async () => {
        await request(app).post("/createUser").send({
            username: "Seu Madruga",
            userAvatar: "teste",
            email: "madruguinha@gteste.com",
            password: "1234"
        });


        const user = await request(app).post("/createUser").send({
            username: "Seu Madruga",
            userAvatar: "Madruga",
            email: "madrugaa@gmail.com",
            password: "2244"

        });

        expect(user.status).toBe(404);
        expect(user.body).toStrictEqual({ message: "User Already Exists!" });
    });

});