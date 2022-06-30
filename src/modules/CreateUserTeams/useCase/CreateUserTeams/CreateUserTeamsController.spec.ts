import request from "supertest";
import { DataSource } from "typeorm";
import { createConnection } from "@database/data-source";
import { app } from "../../../../app";

let connection: DataSource;

 describe("Create User Teams Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to create a new Team, If exists a (registered User with have a valid Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Jane Franklin",
            userAvatar: "Franklin",
            email: "eduobisag@pom.mn",
            password: "9988"
        });

        const userAuthemticate =  await request(app).post("/sessions").send({
            email: "eduobisag@pom.mn",
            password: "9988"
        });

        const { token } = userAuthemticate.body;

        const createUserTeam = await request(app).post("/createUserTeams").send({
            teamName: "S. C. Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(createUserTeam.body).toHaveProperty("teamName", "S. C. Corinthians Paulista");
        expect(createUserTeam.body).toHaveProperty("country", "Brasil");
        expect(createUserTeam.statusCode).toBe(201);
    });

    it("Should be not able to create a new Team, If (teamName) already exists for the same (User)", async () => {
        await request(app).post("/createUser").send({
            username: "Jane Franklin",
            userAvatar: "Franklin",
            email: "eduobisag@pom.mn",
            password: "9988"
        });

        const userAuthemticate =  await request(app).post("/sessions").send({
            email: "eduobisag@pom.mn",
            password: "9988"
        });

        const { token } = userAuthemticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "S. C. Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const createUserTeam2 = await request(app).post("/createUserTeams").send({
            teamName: "S. C. Corinthians Paulista",
            city: "Fake City",
            country: "Fake Country"

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(createUserTeam2.body).toStrictEqual({ message: "Team Already Exists!" });
        expect(createUserTeam2.statusCode).toBe(400);
    });

    it("Should be not able to create a new Team, if the User does not have a (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Alvin Atkins",
            userAvatar: "Atkins",
            email: "veb@coifu.au",
            password: "5522"
        });

        await request(app).post("/sessions").send({
            email: "eduobisag@pom.mn",
            password: "9988"
        });

        const createUserTeam = await request(app).post("/createUserTeams").send({
            teamName: "S. C. Corinthians Paulista",
            city: "Fake City",
            country: "Fake Country"
        });

        expect(createUserTeam.body).toStrictEqual({ message: "JWT token is missing!" });
        expect(createUserTeam.statusCode).toBe(401);
    });

    it("Should be not able to create a new Team, if the User does not have a valid (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Alvin Atkins",
            userAvatar: "Atkins",
            email: "veb@coifu.au",
            password: "5522"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "eduobisag@pom.mn",
            password: "9988"
        });

        const { FakeToken } = userAuthenticate.body;

        const createUserTeam = await request(app).post("/createUserTeams").send({
            teamName: "S. C. Corinthians Paulista",
            city: "Fake City",
            country: "Fake Country"

        }).set({
            Authorization: `Bearer ${FakeToken}`
        });

        expect(createUserTeam.body).toStrictEqual({ message: "Invalid token!" });
        expect(createUserTeam.statusCode).toBe(401);
    });

 });