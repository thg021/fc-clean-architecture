import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "../../../../usecase/customer/find/find.customer.usecase";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";

describe('Test find customer usecase', () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([CustomerModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it('should find a customer', async () => {
    
    const customerRepository = new CustomerRepository()
    const customerUseCase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer("123", "John Doe")
    const address = new Address("test", 1, "zip", "Sao Paulo")
    customer.changeAddress(address)

    await customerRepository.create(customer)

    const output = {
      id: '123', 
      name: 'John Doe', 
      address: {
        street: "test", 
        number: 1, 
        zip: "zip", 
        city: "Sao Paulo"
      }
    }

    const result = await customerUseCase.execute({id: '123'})
    expect(result).toStrictEqual(output)
  });
});