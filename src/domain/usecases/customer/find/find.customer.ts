import { InputCreateCustomerDto } from './../../../../usecase/customer/create/create.customer.dto';
import { OutputFindCustomerDto, InputFindCustomerDto } from './../../../../usecase/customer/find/find.customer.dto';
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";

export class findCustomer{
  private readonly _customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface){
    this._customerRepository = customerRepository
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto>{
    const customer = await this._customerRepository.find(input.id)

    return {
      id: customer.id, 
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.city
      }
    }
  }
}