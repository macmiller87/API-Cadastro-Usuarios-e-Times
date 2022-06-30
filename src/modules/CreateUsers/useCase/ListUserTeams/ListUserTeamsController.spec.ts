import request from "supertest";
import { DataSource } from "typeorm";
import { createConnection } from "@database/data-source";
import { app } from "../../../../app";

let connection: DataSource;

 describe("List User and Teams Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to list User and Teams, If exists a (registered User with have a valid Token) and user_id valid", async () => {
        const user = await request(app).post("/createUser").send({
            username: "Alexander Lamb",
            userAvatar: "Lamb",
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const { token } = userAuthenticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        await request(app).post("/createUserTeams").send({
            teamName: "S. C Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listUserAndTeams = await request(app).get("/profileUserAndTeams").send({
            user_id: user.body.user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(listUserAndTeams.body[0]).toHaveProperty("user_id");
        expect(listUserAndTeams.body[0].username).toEqual("Alexander Lamb");
        expect(listUserAndTeams.body[0].userAvatar).toEqual("Lamb");
        expect(listUserAndTeams.body[0].email).toEqual("padap@dojeh.dm");

        expect(listUserAndTeams.body[0].teams[0]).toHaveProperty("team_id");
        expect(listUserAndTeams.body[0].teams[0]).toHaveProperty("user_id");
        expect(listUserAndTeams.body[0].teams[0].teamName).toEqual("Real Madrid F. C.");

        expect(listUserAndTeams.body[0].teams[1]).toHaveProperty("team_id");
        expect(listUserAndTeams.body[0].teams[1]).toHaveProperty("user_id");
        expect(listUserAndTeams.body[0].teams[1].teamName).toEqual("S. C Corinthians Paulista");
    });

    it("Should be able to list User and Teams, if (user_id) is incorrect", async () => {
        const user = await request(app).post("/createUser").send({
            username: "Alexander Lamb",
            userAvatar: "Lamb",
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const { token } = userAuthenticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        await request(app).post("/createUserTeams").send({
            teamName: "S. C Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listUserAndTeams = await request(app).get("/profileUserAndTeams").send({
            user_id: user.body

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(listUserAndTeams.body).toStrictEqual({ message: "User Not Found!" });
        expect(listUserAndTeams.statusCode).toBe(404);
    });

    it("Should be able to list User and Teams, if the User does not have a (Token)", async () => {
        const user = await request(app).post("/createUser").send({
            username: "Alexander Lamb",
            userAvatar: "Lamb",
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const { token } = userAuthenticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        await request(app).post("/createUserTeams").send({
            teamName: "S. C Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const listUserAndTeams = await request(app).get("/profileUserAndTeams").send({
            user_id: user.body.user_id

        });

        expect(listUserAndTeams.body).toStrictEqual({ message: "JWT token is missing!" });
        expect(listUserAndTeams.statusCode).toBe(401);
    });

    it("Should be able to list User and Teams, if the User does not have a valid (Token)", async () => {
        const user = await request(app).post("/createUser").send({
            username: "Alexander Lamb",
            userAvatar: "Lamb",
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "padap@dojeh.dm",
            password: "8898"
        });

        const { token } = userAuthenticate.body;

        await request(app).post("/createUserTeams").send({
            teamName: "Real Madrid F. C.",
            city: "Madrid",
            country: "Espanha"

        }).set({
            Authorization: `Bearer ${token}`
        });

        await request(app).post("/createUserTeams").send({
            teamName: "S. C Corinthians Paulista",
            city: "São Paulo",
            country: "Brasil"

        }).set({
            Authorization: `Bearer ${token}`
        });

        const { FakeToken } = userAuthenticate.body;

        const listUserAndTeams = await request(app).get("/profileUserAndTeams").send({
            user_id: user.body.user_id

        }).set({
            Authorization: `Bearer ${FakeToken}`
        });

        expect(listUserAndTeams.body).toStrictEqual({ message: "Invalid token!" });
        expect(listUserAndTeams.statusCode).toBe(401);
    });

});