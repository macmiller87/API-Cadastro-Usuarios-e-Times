import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../../app";
import { createConnection } from "@database/data-source";

let connection: DataSource;

describe("List User Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to list a User, if (user_id and token) is correct", async () => {
        await request(app).post("/createUser").send({
            username: "Addie Glover",
            userAvatar: "Glover",
            email: "waci@kaklet.li",
            password: "1122"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "waci@kaklet.li",
            password: "1122"
        });

        const { token } = userAuthenticate.body

        const listUser = await request(app).get("/profile").query({
            user_id: userAuthenticate.body.user.user_id

        }).set({
            Authorization: `Bearer ${token}` 
        });

        expect(userAuthenticate.body.user).toHaveProperty("user_id");
        expect(userAuthenticate.body.user).toHaveProperty("username", "Addie Glover");
        expect(userAuthenticate.body.user).toHaveProperty("email", "waci@kaklet.li");
        expect(listUser.status).toBe(200);
    });

    it("Should not be able to list a User, if (user_id) is incorrect", async () => {
        await request(app).post("/createUser").send({
            username: "Gerald Gibson",
            userAvatar: "Gibson",
            email: "tu@ogpoli.fj",
            password: "6677"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "tu@ogpoli.fj",
            password: "6677"
        });

        const { token } = userAuthenticate.body

        const listUser = await request(app).get("/profile").query({
            user_id: userAuthenticate.body.user

        }).set({
            Authorization: `Bearer ${token}` 
        });

        expect(listUser.status).toBe(404);
        expect(listUser.body).toStrictEqual({ message: "User Not Found!" });
    });

    it("Should not be able to list a User, if the User does not have a (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Gerald Gibson",
            userAvatar: "Gibson",
            email: "tu@ogpoli.fj",
            password: "6677"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "tu@ogpoli.fj",
            password: "6677"
        });

        const listUser = await request(app).get("/profile").query({
            user_id: userAuthenticate.body.user.user_id
        });

        expect(listUser.body).toStrictEqual({ message: "JWT token is missing!" });
        expect(listUser.status).toBe(401);
    });

    it("Should not be able to list a User, if the User does not have a valid (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Gerald Gibson",
            userAvatar: "Gibson",
            email: "tu@ogpoli.fj",
            password: "6677"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "tu@ogpoli.fj",
            password: "6677"
        });

        const { fakeToken } = userAuthenticate.body

        const listUser = await request(app).get("/profile").query({
            user_id: userAuthenticate.body.user.user_id

        }).set({
            Authorization: `Bearer ${fakeToken}` 
        });

        expect(listUser.body).toStrictEqual({ message: "Invalid token!" });
        expect(listUser.status).toBe(409);
    });

});