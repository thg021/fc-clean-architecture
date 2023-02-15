import Product from "../../../../domain/product/entity/product";
import FindProductUseCase from "../../find/product.find.usecase";

const product = new Product("123", "Product A", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  let usecase: FindProductUseCase;

  beforeEach(() => {
    usecase = new FindProductUseCase(MockRepository());
  });
  it("should find a product", async () => {
    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product A",
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
