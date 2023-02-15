import CreateProductUseCase from "../../create/create.product.usecase";

const input = {
  name: "Product Name",
  price: 10.0,
};
const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create Product", () => {
  let productRepository;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    productRepository = MockRepository();
    createProductUseCase = new CreateProductUseCase(productRepository);
  });
  it("should create a new product", async () => {
    const output = await createProductUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    await expect(
      createProductUseCase.execute({ ...input, name: "" })
    ).rejects.toThrow("Name is required");
  });

  it("should thrown an error when price must be less then zero", async () => {
    input.price = -1;

    await expect(
      createProductUseCase.execute({ ...input, price: -1 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
