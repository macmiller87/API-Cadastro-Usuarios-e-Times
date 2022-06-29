import request  from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../../app";
import { createConnection } from "@database/data-source";

let connection: DataSource;

describe("Authenticate a User Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able authenticate a User", async () => {
        await request(app).post("/createUser").send({
            username: "Chaves",
            userAvatar: "Chavinho",
            email: "chavinho@gmail.com",
            password: "6454"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "chavinho@gmail.com",
            password: "6454"
        });

        expect(userAuthenticate.body.user).toHaveProperty("user_id");
        expect(userAuthenticate.body.user).toHaveProperty("username", "Chaves");
        expect(userAuthenticate.body.user).toHaveProperty("email", "chavinho@gmail.com");
        expect(userAuthenticate.body).toHaveProperty("token");
        expect(userAuthenticate.status).toBe(200);
    });

    it("Should not be able to authenticate a User, if (user email) is incorrect", async () => {
        await request(app).post("/createUser").send({
            username: "Kiko",
            userAvatar: "tesouro",
            email: "tesouro@gmail.com",
            password: "4434"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "fakeEmail",
            password: "4434"
        });

        expect(userAuthenticate.status).toBe(404);
        expect(userAuthenticate.body).toStrictEqual({ message: "Email or password incorrect!" });
    });

    it("Should not be able to authenticate a User, if (user password) is incorrect", async () => {
        await request(app).post("/createUser").send({
            username: "Kiko",
            userAvatar: "tesouro",
            email: "tesouro@gmail.com",
            password: "4434"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "tesouro@gmail.com",
            password: "fakePassword"
        });

        expect(userAuthenticate.status).toBe(401);
        expect(userAuthenticate.body).toStrictEqual({ message: "Email or password incorrect!" });
    });

});