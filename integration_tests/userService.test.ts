
/* eslint-disable no-useless-escape */
import app from '../app';
import { testJWT, mockUser } from './sharedTestData';
import request from "supertest"; 

describe("testing-user-routes", () => {

  it("POST /must create a user", async () => {

    const response = await request(app)
    .post("/api/users")
    .send(mockUser)
    .set('Authorization', testJWT);

    expect(201);
    expect(response.body).toHaveProperty('id');
  }),

  it("throwing 400 when firstname and age are missing /create user", async () => {

    const response = await request(app)
    .post("/api/users")
    .send({
      lastname: 'Khachatryan'
    })
    .set('Authorization', testJWT);

    expect(400);
    expect(response.body.message).toBe("\"firstname\" is required. \"age\" is required");
  }),

  it("throwing 400 when firstname length is not (3,20) /create user", async () => {

    const response = await request(app)
    .post("/api/users")
    .send({
      ...mockUser,
    firstname: 'aa'}
    )
    .set('Authorization', testJWT);

    expect(400);
    expect(response.body.message).toBe("\"firstname\" length must be at least 3 characters long");
  }),

  it("throwing 400 when lastname length is not (3,20) /create user", async () => {

    const response = await request(app)
    .post("/api/users")
    .send({
      ...mockUser,
    lastname: 'aa'}
    )
    .set('Authorization', testJWT);

    expect(400);
    expect(response.body.message).toBe("\"lastname\" length must be at least 3 characters long");
  }),

  it("throwing 400 when age is less than 18 /create user", async () => {

    const response = await request(app)
    .post("/api/users")
    .send({
      ...mockUser,
    age: 13}
    )
    .set('Authorization', testJWT);

    expect(400);
    expect(response.body.message).toBe("\"age\" must be greater than or equal to 18");
  }),

  it("throwing 400 when firstname contains characters /create user", async () => {


    const firstname = 'Sara1#'
    const response = await request(app)
    .post("/api/users")
    .send({
      ...mockUser,
    firstname}
    )
    .set('Authorization', testJWT);

    expect(400);
    expect(response.body.message).toBe(`\"firstname\" with value \"${firstname}\" fails to match the required pattern: /^[a-zA-Z]+$/`);
  }),

  it("throwing 400 when lastname contains characters /create user", async () => {


    const lastname = 'Khachatryan#1'
    const response = await request(app)
    .post("/api/users")
    .send({
      ...mockUser,
    lastname}
    )
    .set('Authorization', testJWT);

    expect(400);
    expect(response.body.message).toBe( `\"lastname\" with value \"${lastname}\" fails to match the required pattern: /^[a-zA-Z]+$/`);
  }),

  it("GET /must return user by id", async () => {

    const id = 17; //please make sure you have user with this id
    const response = await request(app)
    .get(`/api/users/${id}`)
    .set('Authorization', testJWT);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('createdAt');
    expect(200);
  }),

  it("throwing 404 when no such user id /GET user by id", async () => {

    const id = 200; //please make sure you don't have user with this id
    const response = await request(app)
    .get(`/api/users/${id}`)
    .set('Authorization', testJWT);

    expect(response.body.message).toBe("not found");
    expect(404);
  }),

  it("GET /must return all users", async () => {

    const response = await request(app)
    .get("/api/users")
    .set('Authorization', testJWT);

    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(200);
  }),

  it("GET /must return all users with name=sara", async () => {

    const response = await request(app)
    .get("/api/users/?name=sara")
    .set('Authorization', testJWT);

    expect(response.body.length).toBeGreaterThanOrEqual(0);
    expect(200);
  }),

  it("PUT /must update a user by id", async () => {

    const id = 17; //please make sure you have user with this id
    const response = await request(app)
    .put(`/api/users/${id}`)
    .send({
        firstname: 'Syune',
      })
    .set('Authorization', testJWT);

    expect(response.text).toBe('User updated.');
    expect(200);
  }),

  it("throwing 404 when no such user id /PUT user by id", async () => {

    const id = 200; //please make sure you don't have user with this id
    const response = await request(app)
    .put(`/api/users/${id}`)
    .set('Authorization', testJWT);

    expect(response.body.message).toBe("not found");
    expect(404);
  }),

  it("throwing 404 when no such user id /DELETE user by id", async () => {

    const id = 200; //please make sure you don't have user with this id
    const response = await request(app)
    .delete(`/api/users/${id}`)
    .set('Authorization', testJWT);

    expect(response.body.message).toBe("not found");
    expect(404);
  }),

  it("DELETE /must delete a user by id", async () => {

    const id = 11; //please make sure you have user with this id
    const response = await request(app)
    .delete(`/api/users/${id}`)
    .send({
        firstname: 'Syune',
      })
    .set('Authorization', testJWT);

    expect(response.text).toBe('User deleted.');
    expect(200);
  })

});