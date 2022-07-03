import request from "supertest";
import { DataSource } from "typeorm";
import { createConnection } from "@database/data-source";
import { app } from "../../../../app";

let connection: DataSource;

 describe("List Specific Team Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to list a Team, If exists a (registered User with have a valid Token) and team_id valid", async () => {
        await request(app).post("/createUser").send({
            username: "Lela Schwartz",
            userAvatar: "Schwartz",
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const { token } = userAuthenticate.body;

        const userTeam = await request(app).post("/createUserTeams").send({
            teamName: "F. C. Barcelona",
            city: "Barcelona",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listSpecificTeam = await request(app).get("/listSpecifcTeam").query({
            team_id: userTeam.body.team_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(listSpecificTeam.body[0]).toHaveProperty("team_id");
        expect(listSpecificTeam.body[0]).toHaveProperty("user_id");
        expect(listSpecificTeam.body[0].teamName).toEqual("F. C. Barcelona");
        expect(listSpecificTeam.body[0].city).toEqual("Barcelona");
        expect(listSpecificTeam.statusCode).toBe(200);
    });

    it("Should be not able to list a Team, if (team_id) is incorrect", async () => {
        await request(app).post("/createUser").send({
            username: "Lela Schwartz",
            userAvatar: "Schwartz",
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const { token } = userAuthenticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "S. C. Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });
                                      
        const listSpecificTeam = await request(app).get("/listSpecifcTeam").query({
            team_id: process.env.FAKE_ID

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(listSpecificTeam.body).toStrictEqual({ message: "Team Not Found!" })
        expect(listSpecificTeam.statusCode).toBe(404);
    });

    it("Should be not able to list a Team, if the User does not have a (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Lela Schwartz",
            userAvatar: "Schwartz",
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const { token } = userAuthenticate.body;

        const userTeam = await request(app).post("/createUserTeams").send({
            teamName: "F. C. Barcelona",
            city: "Barcelona",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listSpecificTeam = await request(app).get("/listSpecifcTeam").query({
            team_id: userTeam.body.team_id
        });

        expect(listSpecificTeam.body).toStrictEqual({ message: "JWT token is missing!" });
        expect(listSpecificTeam.statusCode).toBe(401);
    });

    it("Should be not able to list a Team, if the User does not have a valid (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Lela Schwartz",
            userAvatar: "Schwartz",
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "biag@gavsuj.ae",
            password: "2332"
        });

        const { token } = userAuthenticate.body;

        const userTeam = await request(app).post("/createUserTeams").send({
            teamName: "F. C. Barcelona",
            city: "Barcelona",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const { FakeToken } = userAuthenticate.body;

        const listSpecificTeam = await request(app).get("/listSpecifcTeam").query({
            team_id: userTeam.body.team_id

        }).set({
            Authorization: `Bearer ${FakeToken}`
        });

        expect(listSpecificTeam.body).toStrictEqual({ message: "Invalid token!" });
        expect(listSpecificTeam.statusCode).toBe(409);
    });

});