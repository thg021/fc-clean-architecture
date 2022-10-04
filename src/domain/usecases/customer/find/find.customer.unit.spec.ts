import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "../../../../usecase/customer/find/find.customer.usecase";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";

const customer = new Customer("123", "John Doe")
const address = new Address("test", 1, "zip", "Sao Paulo")
customer.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(), 
    create: jest.fn(), 
    update: jest.fn()
  }
}

describe('Unit test find customer usecase', () => {

  it('should find a customer', async () => {
    
    const customerRepository = MockRepository()
    const customerUseCase = new FindCustomerUseCase(customerRepository)

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
  
  it('should find not a customer', () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() =>{
      throw new Error("Customer not found")
    })
    const customerUseCase = new FindCustomerUseCase(customerRepository)

    expect(() => {
            return customerUseCase.execute({id: '1234'})
    }).rejects.toThrow("Customer not found")

  })
});