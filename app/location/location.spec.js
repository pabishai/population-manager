import supertest from "supertest";
import mongoose from "mongoose";
import app from "../index";
import Location from "./location.model";
import databaseConnection from "../utils/databaseConnection";
import databaseConfig from "../config/database.config";

const newLocation = {
  location: 254,
  male: 20,
  female: 100
};

let server;
let request;

beforeAll(done => {
  server = app.listen(4000, () => {
    done();
  });

  request = supertest(server);
  function clearDB() {
    const promises = [Location.remove().exec()];

    Promise.all(promises).then(function() {
      done();
    });
  }

  if (mongoose.connection.readyState === 0) {
    databaseConnection(databaseConfig.test_url);
  }

  return clearDB();
});

afterAll(async () => {
  await server.close();
  await mongoose.disconnect();
});

describe("Location", () => {
  it("should not create a location with an invalid code", async () => {
    const invalidLocation = { ...newLocation };
    invalidLocation.location = "were";
    const response = await request.post("/location").send(invalidLocation);
    expect(response.status).toEqual(400);
  });

  it("should not create a location without female population figures", async () => {
    const invalidLocation = { ...newLocation };
    delete invalidLocation.female;
    const response = await request.post("/location").send(invalidLocation);
    expect(response.status).toEqual(400);
  });

  it("should not create a location without female population figures", async () => {
    const invalidLocation = { ...newLocation };
    delete invalidLocation.male;
    const response = await request.post("/location").send(invalidLocation);
    expect(response.status).toEqual(400);
  });

  it("should successfully create a location given valid data", async () => {
    const response = await request.post("/location").send(newLocation);
    expect(response.status).toEqual(201);
  });

  it("should not duplicate location data", async () => {
    const response = await request.post("/location").send(newLocation);
    expect(response.body.message).toContain(
      "location population already entered"
    );
  });

  it("should get added location population data", async () => {
    const response = await request.get("/location").send();
    expect(response.body.length).toEqual(1);
  });

  it("should successfully calculate the total", async () => {
    const response = await request.get("/location").send();
    expect(response.body[0].total).toEqual(
      newLocation.male + newLocation.female
    );
  });

  it("should not update location data if the location is invalid", async () => {
    const response = await request
      .put("/location/3")
      .send({ male: 100, female: 100 });
    expect(response.status).toEqual(400);
  });

  it("should not update location data", async () => {
    const response = await request
      .put("/location/254")
      .send({ male: 100, female: 100 });
    expect(response.body.female).toEqual(100);
  });

});
