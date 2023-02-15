import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "../../list/product.list.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product = ProductFactory.create("Product 1", 10);
    await productRepository.create(product);

    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await usecase.execute();

    expect(result.products.length).toBe(1);
    expect(result.products[0]).toEqual(output);
  });
});
