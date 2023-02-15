import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "../../update/update.customer.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const customer = CustomerFactory.createWithAddress(
      "Customer",
      new Address("Street", 123, "Zip", "City")
    );
    await customerRepository.create(customer);

    customer.changeName("Customer 2");

    const input = {
      id: customer.id,
      name: "John Updated",
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: "Zip Updated",
        city: "City Updated",
      },
    };

    const result = await usecase.execute(input);
    const output = {
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    };
    expect(result).toEqual(output);
  });
});
