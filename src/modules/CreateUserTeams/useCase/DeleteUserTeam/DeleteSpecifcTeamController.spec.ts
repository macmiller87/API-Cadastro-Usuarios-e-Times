import request from "supertest";
import { DataSource } from "typeorm";
import { createConnection } from "@database/data-source";
import { app } from "../../../../app";

let connection: DataSource;

 describe("Delete Specific Team Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to delete a Specific Team, If exists a (registered User with have a valid Token) and team_id valid", async () => {
        await request(app).post("/createUser").send({
            username: "Georgia Griffith",
            userAvatar: "Griffith",
            email: "futpi@ka.cd",
            password: "5566"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "futpi@ka.cd",
            password: "5566"
        });

        const { token } = userAuthenticate.body;

        const createTeam = await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const deleteSpecificTeam = await request(app).delete("/deleteSpecifcTeam").query({
            team_id: createTeam.body.team_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(deleteSpecificTeam.body).toStrictEqual({ message: "Team Delete with sucess!" });
        expect(deleteSpecificTeam.statusCode).toBe(200);
    });

    it("Should be able to delete a Specific Team, if (team_id) is incorrect", async () => {
        await request(app).post("/createUser").send({
            username: "Georgia Griffith",
            userAvatar: "Griffith",
            email: "futpi@ka.cd",
            password: "5566"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "futpi@ka.cd",
            password: "5566"
        });

        const { token } = userAuthenticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const deleteSpecificTeam = await request(app).delete("/deleteSpecifcTeam").query({
            team_id: process.env.FAKE_ID

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(deleteSpecificTeam.body).toStrictEqual({ message: "Team Not Found!" });
        expect(deleteSpecificTeam.statusCode).toBe(404);
    });

    it("Should be able to delete a Specific Team, if the User does not have a (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Georgia Griffith",
            userAvatar: "Griffith",
            email: "futpi@ka.cd",
            password: "5566"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "futpi@ka.cd",
            password: "5566"
        });

        const { token } = userAuthenticate.body;

        const createTeam = await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const deleteSpecificTeam = await request(app).delete("/deleteSpecifcTeam").query({
            team_id: createTeam.body.team_id
        });

        expect(deleteSpecificTeam.body).toStrictEqual({ message: "JWT token is missing!" });
        expect(deleteSpecificTeam.statusCode).toBe(401);
    });

    it("Should be able to delete a Specific Team, if the User does not have a valid (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Georgia Griffith",
            userAvatar: "Griffith",
            email: "futpi@ka.cd",
            password: "5566"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "futpi@ka.cd",
            password: "5566"
        });

        const { token } = userAuthenticate.body;

        const createTeam = await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const { FakeToken } = userAuthenticate.body;

        const deleteSpecificTeam = await request(app).delete("/deleteSpecifcTeam").query({
            team_id: createTeam.body.team_id

        }).set({
            Authorization: `Bearer ${FakeToken}`
        });

        expect(deleteSpecificTeam.body).toStrictEqual({ message: "Invalid token!" });
        expect(deleteSpecificTeam.statusCode).toBe(409);
    });

});