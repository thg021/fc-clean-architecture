import ProductFactory from "../../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "../../update/update.product.usecase";
const product = ProductFactory.create("Product 1", 10);

const input = {
  id: product.id,
  name: "Product Update",
  price: 12,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const customerRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(customerRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
