import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E for test customer", () => {
  const customer = {
    name: "John",
    address: {
      city: "London",
      street: "street",
      number: 123,
      zip: "12345",
    },
  };
  //a cada chamada
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const data = { ...customer };
    const response = await request(app).post("/customer").send(data);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      ...data,
    });
  });

  it("should not create a new customer", async () => {
    const data = { ...customer };
    data.name = "";
    const response = await request(app).post("/customer").send(data);

    expect(response.statusCode).toBe(500);
  });

  it("should list customers", async () => {
    const data = { ...customer };
    await request(app).post("/customer").send(data);
    await request(app).post("/customer").send(data);

    const response = await request(app).get("/customer").send();
    expect(response.statusCode).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0]).toEqual({
      id: expect.any(String),
      ...data,
    });
  });

  it("should return a empty array of costumer", async () => {
    const response = await request(app).get("/customer").send();
    expect(response.body.customers.length).toBe(0);
  });

  it("should be able to update a customer", async () => {
    const data = { ...customer };
    const responseCustomer = await request(app).post("/customer").send(data);
    const { id } = responseCustomer.body;
    const customerUpdated = {
      ...data,
      id,
      name: "customer updated",
    };
    const response = await request(app).put("/customer").send(customerUpdated);
    expect(response.body).toEqual(customerUpdated);
  });

  it("should be able to status 500 when customer is not found", async () => {
    const data = {
      ...customer,
      id: "fake",
    };

    const response = await request(app).put("/customer").send(data);
    expect(response.statusCode).toBe(500);
  });

  it("should be able to find id customer", async () => {
    const data = { ...customer };
    const customer1 = await request(app).post("/customer").send(data);
    const customer2 = await request(app).post("/customer").send(data);

    const findCustomer = await request(app)
      .get(`/customer/${customer1.body.id}`)
      .send();
    expect(findCustomer.body.id).toBe(customer1.body.id);
  });

  it("should return empty data when not find customer", async () => {
    const findCustomer = await request(app).get(`/customer/fake_id`).send();

    expect(findCustomer.statusCode).toBe(500);
  });
});
