import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E for test product", () => {
  const product = {
    name: "John",
    price: 10.0,
  };
  //a cada chamada
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const data = { ...product };
    const response = await request(app).post("/product").send(data);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      ...data,
    });
  });

  it("should not create a new product", async () => {
    const data = { ...product };
    data.name = "";
    const response = await request(app).post("/product").send(data);

    expect(response.statusCode).toBe(500);
  });

  it("should list products", async () => {
    const data = { ...product };
    await request(app).post("/product").send(data);
    await request(app).post("/product").send(data);

    const response = await request(app).get("/product").send();
    expect(response.statusCode).toBe(200);
    expect(response.body.products.length).toBe(2);
    expect(response.body.products[0]).toEqual({
      id: expect.any(String),
      ...data,
    });
  });

  it("should return a empty array of costumer", async () => {
    const response = await request(app).get("/product").send();
    expect(response.body.products.length).toBe(0);
  });

  it("should be able to update a product", async () => {
    const data = { ...product };
    const responseProduct = await request(app).post("/product").send(data);
    const { id } = responseProduct.body;
    const productUpdated = {
      ...data,
      id,
      name: "product updated",
    };
    const response = await request(app).put("/product").send(productUpdated);
    expect(response.body).toEqual(productUpdated);
  });

  it("should be able to status 500 when product is not found", async () => {
    const data = {
      ...product,
      id: "fake",
    };

    const response = await request(app).put("/product").send(data);
    expect(response.statusCode).toBe(500);
  });

  it("should be able to find id product", async () => {
    const data = { ...product };
    const product1 = await request(app).post("/product").send(data);
    const product2 = await request(app).post("/product").send(data);

    const findProduct = await request(app)
      .get(`/product/${product1.body.id}`)
      .send();
    expect(findProduct.body.id).toBe(product1.body.id);
  });

  it("should return empty data when not find product", async () => {
    const findProduct = await request(app).get(`/product/fake_id`).send();

    expect(findProduct.statusCode).toBe(500);
  });
});
